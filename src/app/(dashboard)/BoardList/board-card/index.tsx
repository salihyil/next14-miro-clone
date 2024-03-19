"use client";

import Actions from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Footer from "./footer";
import Overlay from "./overlay";

type BoardCardProps = {
  key: Id<"boards">;
  id: Id<"boards">;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
};

const BoardCard = ({ authorId, authorName, createdAt, id, imageUrl, isFavorite, key, orgId, title }: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(api.board.favorite);
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(api.board.unfavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill />
          <Overlay />
          <Actions id={id} title={title} side={"right"} sideOffset={12}>
            <button className="absolute z-50 top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export { BoardCard };
