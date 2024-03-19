"use client";

import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

type Props = {};

const EmptyBoards = (props: Props) => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.createBoard);
  const handleClick = () => {
    if (!organization) return null;
    mutate({ orgId: organization.id, title: "Untitled" })
      .then((id) => {
        toast.success("Created a new board");
        router.push(`/board/${id}`);
        
      })
      .catch((e) => {
        toast.error("Failed to create board!");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={"/note.svg"} alt="empty-search" width={110} height={110}></Image>
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">Start by creating a board for your organization</p>
      <div className="mt-6">
        <Button disabled={pending} size={"lg"} onClick={handleClick}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export { EmptyBoards };
