"use client";

import {
  $createParagraphNode,
  $getSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { OPEN_FLOATING_COMPOSER_COMMAND } from "@liveblocks/react-lexical";
import { motion } from "motion/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MouseEventHandler, ReactNode, useCallback } from "react";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { useActiveBlock } from "@/hooks/useActiveBlock";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  MessageSquare,
} from "lucide-react";

const DROPDOWN_OPTIONS = [
  { id: "paragraph", text: "Paragraph" },
  { id: "quote", text: "Quote" },
  { id: "h1", text: "Heading 1" },
  { id: "h2", text: "Heading 2" },
  { id: "h3", text: "Heading 3" },
  { id: "h4", text: "Heading 4" },
  { id: "h5", text: "Heading 5" },
  { id: "h6", text: "Heading 6" },
];

type DropdownIds = (typeof DROPDOWN_OPTIONS)[number]["id"];

export function FloatingToolbarOptions({
  setState,
}: {
  setState: (state: "default" | "closed") => void;
}) {
  const [editor] = useLexicalComposerContext();
  const activeBlock = useActiveBlock();

  const toggleBlock = useCallback(
    (type: DropdownIds) => {
      const selection = $getSelection();

      if (activeBlock === type || type === "paragraph") {
        return $setBlocksType(selection, () => $createParagraphNode());
      }

      if (type.startsWith("h")) {
        return $setBlocksType(selection, () => $createHeadingNode());
      }

      if (type === "quote") {
        return $setBlocksType(selection, () => $createQuoteNode());
      }
    },
    [activeBlock]
  );

  return (
    <motion.div
      layoutId="floating-toolbar-main"
      layout="size"
      style={{ display: "block" }}
      className="p-1 rounded-lg border shadow-lg border-border/80 bg-card pointer-events-auto origin-top text-foreground"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.25 }}
    >
      <div className="flex items-center justify-center gap-1">
        <label htmlFor="select-block" className="h-8 items-center align-top">
          <span className="sr-only">Select block type</span>
          <select
            id="select-block"
            onInput={(e) =>
              editor.update(() => toggleBlock(e.currentTarget.value))
            }
            className="dark:bg-[#111111] bg-[#f9f9f9] border-0 h-8 pl-2 rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground data-active:bg-accent"
            value={activeBlock || "paragraph"}
          >
            {DROPDOWN_OPTIONS.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </label>

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            setState("default");
          }}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            setState("default");
          }}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            setState("default");
          }}
        >
          <Underline className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            setState("default");
          }}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            setState("default");
          }}
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px py-3.5 bg-border/50" />

        <ToolbarButton
          onClick={() => {
            editor.dispatchCommand(OPEN_FLOATING_COMPOSER_COMMAND, undefined);
            setState("closed");
          }}
        >
          <MessageSquare className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </motion.div>
  );
}

function ToolbarButton({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex relative items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-8 h-8 data-active:bg-accent"
    >
      {children}
    </button>
  );
}
