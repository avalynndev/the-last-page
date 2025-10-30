"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  autoUpdate,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from "@floating-ui/react-dom";
import { useRange } from "@/hooks/useRange";
import { useMouseListener } from "@/hooks/useMouseListener";
import { FloatingToolbarOptions } from "./toolbar-options";

const MARGIN_X = 32;

export function FloatingToolbar() {
  const padding = 20;
  const [fullWidth, setFullWidth] = useState(false);
  const [editor] = useLexicalComposerContext();

  const {
    refs: { setReference, setFloating },
    strategy,
    x,
    y,
  } = useFloating({
    strategy: "fixed",
    placement: "bottom",
    middleware: [
      offset(10),
      hide({ padding }),
      shift({ padding, limiter: limitShift() }),
      size({ padding }),
    ],
    whileElementsMounted: (...args) => {
      return autoUpdate(...args, {
        animationFrame: true,
      });
    },
  });

  const { range, rangeRef } = useRange();
  useLayoutEffect(() => {
    setReference({
      getBoundingClientRect: () =>
        range?.getBoundingClientRect() || new DOMRect(),
    });
  }, [setReference, range]);

  useEffect(() => {
    if (range === null) {
      const id = setTimeout(() => setFullWidth(false), 0);
      return () => clearTimeout(id);
    }
  }, [range]);

  const [creatingMouseSelection, setCreatingMouseSelection] = useState(false);
  useMouseListener((mouse) => {
    setTimeout(() => {
      setTimeout(() => {
        setCreatingMouseSelection(
          rangeRef.current === null && mouse === "down"
        );
      });
    });
  });

  if (range === null || creatingMouseSelection) {
    return null;
  }

  return createPortal(
    <div
      ref={setFloating}
      className="pointer-events-none"
      style={
        fullWidth && editor._rootElement
          ? {
              position: strategy,
              top: 0,
              left: editor._rootElement.getBoundingClientRect().left + MARGIN_X,
              transform: `translate3d(0, ${Math.round(y)}px, 0)`,
              width:
                editor._rootElement.getBoundingClientRect().width -
                MARGIN_X * 2,
            }
          : {
              position: strategy,
              top: 0,
              left: 0,
              transform: `translate3d(${Math.round(x)}px, ${Math.round(
                y
              )}px, 0)`,
              minWidth: "max-content",
            }
      }
    >
      <ToolbarOptions />
    </div>,
    document.body
  );
}

function ToolbarOptions() {
  const [state, setState] = useState<"default" | "closed">("default");

  if (state === "closed") {
    return null;
  }

  return (
    <div className="w-full text-foreground text-sm leading-relaxed">
      {state === "default" ? (
        <FloatingToolbarOptions setState={setState} />
      ) : null}
    </div>
  );
}
