import Image from "next/image";

type Props = {};

const EmptySearch = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={"/empty-search.svg"} alt="empty-search" width={140} height={140}></Image>
      <h2 className="text-2xl font-semibold mt-6">No result found!</h2>
      <p className="text-muted-foreground text-sm mt-2">Try searching for something else</p>
    </div>
  );
};

export { EmptySearch };
