"use client";

import { useOrganization } from "@clerk/nextjs";
import BoardList from "./BoardList";
import EmptyOrg from "./_components/EmptyOrg";

interface DashboardPageProps {}

const DashboardPage = ({}: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? <EmptyOrg /> : <BoardList orgId={organization.id} />}
    </div>
  );
};

export default DashboardPage;
