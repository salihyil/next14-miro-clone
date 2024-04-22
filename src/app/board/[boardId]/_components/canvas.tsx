"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="relative h-full w-full bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants boardId={boardId} />
      <Toolbar />
    </main>
  );
};

export { Canvas };
