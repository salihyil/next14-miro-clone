//api endpoint

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ORG_BOARD_LIMIT = 2;

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

// Create a  Board
export const createBoard = mutation({
  args: { orgId: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const orgSubscription = await ctx.db
      .query("orgSubscription")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .unique();
    const periodEnd = orgSubscription?.stripeCurrentPeriodEnd;
    const isSubscribed = periodEnd && periodEnd > Date.now();

    const existingBoards = await ctx.db
      .query("boards")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    if (!isSubscribed && existingBoards.length >= ORG_BOARD_LIMIT) {
      throw new Error("Organization has reached its board limit");
    }

    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
      title: args.title,
    });

    return board;
  },
});

// Delete a  Board
export const deleteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => q.eq("userId", identity.subject).eq("boardId", args.id))
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);

    return true;
  },
});

// Update a  Board
export const updateBoard = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const title = args.title.trim();
    const randomImage = images[Math.floor(Math.random() * images.length)];

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const favoriteAlreadyExists = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => q.eq("userId", userId).eq("boardId", board._id))
      .unique();

    if (favoriteAlreadyExists) {
      throw new Error("Favorite already exists");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const favoriteAlreadyExists = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => q.eq("userId", userId).eq("boardId", board._id))
      .unique();

    if (!favoriteAlreadyExists) {
      throw new Error("Favorited board not found");
    }

    await ctx.db.delete(favoriteAlreadyExists._id);

    return board;
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);

    return board;
  },
});
