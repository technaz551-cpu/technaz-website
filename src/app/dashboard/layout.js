import Sidebar from "@/components/dashboard/Sidebar";
import DashboardAuthInit from "@/components/dashboard/DashboardAuthInit";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <main className="bg-grid-light relative min-h-0 flex-1 overflow-y-auto">
        <DashboardAuthInit />
        {children}
      </main>
    </div>
  );
}
