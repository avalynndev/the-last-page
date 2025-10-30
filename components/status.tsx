"use client";

import { useSyncStatus } from "@liveblocks/react/suspense";
import { Loader2, CheckCircle } from "lucide-react";

export function Status() {
  const status = useSyncStatus({ smooth: true });

  return (
    <div className="flex items-center text-gray-500 font-semibold gap-1.5 text-xs">
      {status === "synchronizing" ? (
        <Loader2 className="w-5 h-5 opacity-70 animate-spin" />
      ) : (
        <CheckCircle className="w-5 h-5 opacity-70 p-px" />
      )}
    </div>
  );
}
