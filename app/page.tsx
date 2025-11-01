"use client";

import { Editor } from "../components/editor";
import { Avatars } from "../components/avatars";
import { Status } from "../components/status";
import { Room } from "./room";
import { AuthWrapper } from "@/components/auth-provider";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export default function Page() {
  return (
    <AuthWrapper>
      <Room>
        <div className="sticky top-0 left-0 right-0 h-[60px] flex items-center justify-between px-4 z-20">
          <div className="absolute top-3 left-3">
            <Status />
          </div>
          <div />
          <Avatars />
        </div>
        <Editor />
      </Room>
    </AuthWrapper>
  );
}
