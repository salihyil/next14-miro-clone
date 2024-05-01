"use node";
import { v } from "convex/values";
import Stripe from "stripe";
import { action } from "./_generated/server";

const url = process.env.NEXT_PUBLIC_APP_URL;
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2024-04-10",
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
