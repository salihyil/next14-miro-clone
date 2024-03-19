import Image from "next/image";

type Props = {};

const EmptyFavorites = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={"/empty-favorites.svg"} alt="empty-search" width={140} height={140}></Image>
      <h2 className="text-2xl font-semibold mt-6">No favorite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">Try favoriting a board</p>
    </div>
  );
};

export { EmptyFavorites };
