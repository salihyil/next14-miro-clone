type Props = {};

export const Participants = (props: Props) => {
  return <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">Lİst of users</div>;
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />;
};
