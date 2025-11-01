"use client";

import { RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getRoomId } from "@/config";

function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");
  return exampleId ? `${roomId}-${exampleId}` : roomId;
}

export function Room({ children }: { children: ReactNode }) {
  const roomId = useExampleRoomId(getRoomId("room"));

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
      initialStorage={{
        title: "TheLastPage",
      }}
    >
      {children}
    </RoomProvider>
  );
}
