"use client";

import Actions from "@/components/actions";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type InfoProps = {
  boardId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

const TabSeperator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md flex items-center">
      <Hint label="Go to boards" side="bottom" alignOffset={10}>
        <Button asChild variant={"board"} className="px-2">
          <Link href={`/`}>
            <Image src={"/logo.svg"} alt="board logo" height={40} width={40} />
            <span className={cn("font-semibold text-xl ml-2 text-black", font.className)}>Board</span>
          </Link>
        </Button>
      </Hint>
      <TabSeperator />
      <Hint label="Edit Label" side="bottom" alignOffset={10}>
        <Button variant={"board"} className="text-base font-normal px-2" onClick={() => onOpen(boardId, data.title)}>
          {data.title}
        </Button>
      </Hint>
      <TabSeperator />
      <Actions id={boardId} title={data.title} side={"bottom"} sideOffset={10}>
        <div>
          <Hint label="Main Menu" side="bottom" alignOffset={10}>
            <Button size={"icon"} variant={"board"} className="text-base font-normal px-2">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md flex items-center w-[300px]" />
  );
};
