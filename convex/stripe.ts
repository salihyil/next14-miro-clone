"use node";
import { v } from "convex/values";
import Stripe from "stripe";
import { internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";

const url = process.env.NEXT_PUBLIC_APP_URL;
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-04-10",
});

export const portal = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    if (!args.orgId) {
      throw new Error("No organization id");
    }

    const orgSubscription = await ctx.runQuery(internal.subscriptions.get, {
      orgId: args.orgId,
    });

    if (!orgSubscription) {
      throw new Error(`No subscription`);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: orgSubscription.stripeCustomerId,
      return_url: url,
    });

    return session.url;
  },
});

export const pay = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!args.orgId) {
      throw new Error("No organization id");
    }

    const session = stripe.checkout.sessions.create({
      success_url: url,
      cancel_url: url,
      customer_email: identity.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Board Pro",
              description: "Unlimited boards for your organization",
            },
            unit_amount: 1999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        orgId: args.orgId,
      },
      mode: "subscription",
    });

    return (await session).url!;
  },
});

export const fulfill = internalAction({
  args: {
    signature: v.string(),
    payload: v.string(),
  },
  async handler(ctx, { signature, payload }) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    try {
      const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
      const session = event.data.object as Stripe.Checkout.Session;

      if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if (!session?.metadata?.orgId) {
          throw new Error("No organization ID");
        }

        await ctx.runMutation(internal.subscriptions.create, {
          orgId: session.metadata.orgId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
        });
      }

      if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        await ctx.runMutation(internal.subscriptions.update, {
          stripeSubscriptionId: subscription.id,
          stripeCurrentPeriodEnd: subscription.current_period_end * 1000,
        });
      }

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
});
