"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useProModal } from "@/store/use-pro-modal";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

type NewBoardButtonProps = {
  orgId: string;
  disabled?: boolean;
};

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { isOpen, onClose, onOpen } = useProModal();
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.createBoard);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board");
        onOpen();
      });
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || pending) && "opacity-75 cursor-not-allowed"
      )}>
      <Plus className="text-white h-12 w-12 stroke-1" />
      <p className="text-sm font-light text-white">New Board</p>
    </button>
  );
};

export { NewBoardButton };
