import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/* indexes, Convex'e belgelerinizi nasıl düzenleyeceğini anlatarak  document querie'lerinizi hızlandırmanıza olanak tanıyan bir data structure. Indexes ayrıca sorgu(query) sonuçlarındaki documents'in sırasını değiştirmenize de olanak tanır. */
export default defineSchema({
  //boards table
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
    // favoritedUsers: v.array(v.string()), ->böyle scalable olmayacaktı
    //userFavorites table'ı o yüzden ekledik
  })
    .index("by_orgId", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),

  //favorites table (Favorite & Unfavorite)
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
  })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),
});
