"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { getRoomInfo } from "@/actions/liveblocks";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint={authWithLocalUser("/api/liveblocks-auth")}
      resolveRoomsInfo={async ({ roomIds }) => {
        const info = await getRoomInfo(roomIds);
        return info;
      }}
    >
      {children}
    </LiveblocksProvider>
  );
}

export function authWithLocalUser(endpoint: string) {
  return async (room?: string) => {
    if (typeof window === "undefined") return null;

    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    if (!username || !avatar) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room, user: { name: username, avatar } }),
    });

    return await response.json();
  };
}
