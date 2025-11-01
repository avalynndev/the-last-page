"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { getRoomInfo } from "@/actions/liveblocks";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint={authWithLocalUser("/api/liveblocks-auth")}
      resolveUsers={async ({ userIds }) => {
        const searchParams = new URLSearchParams(
          userIds.map((userId) => ["userIds", userId])
        );
        const response = await fetch(`/api/users?${searchParams}`);

        if (!response.ok) {
          throw new Error("Problem resolving users");
        }

        const users = await response.json();
        return users;
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const response = await fetch(
          `/api/users/search?text=${encodeURIComponent(text)}`
        );

        if (!response.ok) {
          throw new Error("Problem resolving mention suggestions");
        }

        const userIds = await response.json();
        return userIds;
      }}
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room, user: { name: username, avatar } }),
    });

    return await response.json();
  };
}
