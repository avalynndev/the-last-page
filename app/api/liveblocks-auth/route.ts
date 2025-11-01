import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { user, room } = await request.json();

    if (!user?.name || !user?.avatar) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 400,
      });
    }

    const session = liveblocks.prepareSession(user.name, {
      userInfo: {
        name: user.name,
        avatar: user.avatar,
        color: "#000000",
      },
    });

    session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);

    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
