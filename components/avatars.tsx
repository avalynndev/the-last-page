"use client";

import Image from "next/image";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Avatars() {
  return (
    <ClientSideSuspense
      fallback={
        <div className="flex items-center">
          <div className="relative ml-2">
            <AvatarPlaceholder />
          </div>
          <div className="ml-2 text-gray-500 text-sm select-none">
            1 user editing
          </div>
        </div>
      }
    >
      <AvatarStack />
    </ClientSideSuspense>
  );
}

const AVATAR_SIZE = 36;

function AvatarStack() {
  const users = useOthers();
  const self = useSelf();
   const username =
     typeof window !== "undefined" ? localStorage.getItem("username") : null;
   const avatar =
     typeof window !== "undefined" ? localStorage.getItem("avatar") : null;

   if (self && username) {
     self.info.name = username;
     if (avatar) self.info.avatar = avatar;
   }

  return (
    <TooltipProvider>
      <div className="flex items-center">
        {self && (
          <div className="relative ml-2">
            <Avatar src={self.info.avatar} name={self.info.name} />
          </div>
        )}

        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>

        <div className="ml-2 text-gray-500 text-sm select-none">
          {users.length + 1} user{users.length ? "s" : ""} editing
        </div>
      </div>
    </TooltipProvider>
  );
}

export function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          className="-ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400 overflow-hidden cursor-pointer"
        >
          <Image
            src={src}
            alt={name}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            className="rounded-full object-cover"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function AvatarPlaceholder() {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="-ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400 overflow-hidden"
    >
      <div className="w-full h-full rounded-full bg-neutral-200" />
    </div>
  );
}
