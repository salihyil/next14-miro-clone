"use client";

import { CanvasMode, CanvasState } from "@/types/canvas";
import { useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useCanRedo, useCanUndo, useHistory } from "../../../../../liveblocks.config";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory()
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();


  return (
    <main className="relative h-full w-full bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants boardId={boardId} />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};

export { Canvas };
