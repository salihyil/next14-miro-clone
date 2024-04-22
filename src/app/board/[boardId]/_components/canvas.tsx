"use client";

import { useSelf } from "../../../../../liveblocks.config";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

type CanvasProps = {
  boardId: string;
};

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);
  console.log(info);

  return (
    <main className="relative h-full w-full bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export { Canvas };
