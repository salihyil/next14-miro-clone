import { v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

export const get = internalQuery({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.orgId) {
      return null;
    }
    const orgSubscription = await ctx.db
      .query("orgSubscription")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .unique();

    return orgSubscription;
  },
});

export const getIsSubscribed = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.orgId) {
      return false;
    }
    const orgSubscription = await ctx.db
      .query("orgSubscription")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .unique();

    const periodEnd = orgSubscription?.stripeCurrentPeriodEnd;
    const isSubscribed = periodEnd && periodEnd > Date.now();
    return isSubscribed;
  },
});

export const create = internalMutation({
  args: {
    orgId: v.string(),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    stripeCurrentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("orgSubscription", args);
  },
});

export const update = internalMutation({
  args: {
    stripeSubscriptionId: v.string(),

    stripeCurrentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const existingSubscription = await ctx.db
        .query("orgSubscription")
        .withIndex("stripeSubscription", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId))
        .unique();

      if (!existingSubscription) {
        throw new Error("Subscription not found");
      }

      await ctx.db.patch(existingSubscription._id, {
        stripeCurrentPeriodEnd: args.stripeCurrentPeriodEnd,
      });

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  },
});
