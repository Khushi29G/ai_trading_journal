import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">

      <AppSidebar />

      <div className="flex-1">

        <AppHeader />

       <main className="p-8 bg-gradient-to-br from-[#020617] via-[#030712] to-[#020617] min-h-screen">
          {children}
        </main>

      </div>

    </div>
  );
}