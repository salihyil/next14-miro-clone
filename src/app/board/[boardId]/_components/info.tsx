type Props = {};

export const Info = (props: Props) => {
  return <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md flex items-center">Info</div>;
};

Info.Skeleton = function InfoSkeleton() {
  return <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 shadow-md flex items-center w-[300px]" />;
};
