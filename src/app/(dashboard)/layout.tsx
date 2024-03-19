import Navbar from "@/app/(dashboard)/_components/Navbar";
import OrgSideBar from "@/app/(dashboard)/_components/OrgSidebar/";
import SideBar from "@/app/(dashboard)/_components/Sidebar/";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <main className="h-full">
      <SideBar />

      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSideBar />
          <div className="flex-1 h-full">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
