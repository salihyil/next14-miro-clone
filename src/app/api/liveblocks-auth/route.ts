import { Liveblocks } from "@liveblocks/node";

//we can use convex inside of our route handlers
import { auth, currentUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: "sk_dev_kdzZNwf-JyWuMtJ6IzQTK5EMkKjEEC7-7cEhynwN0XkHGUA-Lt9aAngAQ1hcygap",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization && !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: user?.firstName || "Teammate",
    picture: user?.imageUrl!,
  };

  const session = liveblocks.prepareSession(user?.id!, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
