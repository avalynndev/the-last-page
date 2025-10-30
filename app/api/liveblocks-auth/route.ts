import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { getSession } from "@/example";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await getSession(request);

  const session = liveblocks.prepareSession(`${user.id}`, {
    userInfo: user.info,
  });

  session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);

  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
