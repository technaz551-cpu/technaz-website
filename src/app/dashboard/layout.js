import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="bg-grid-light relative flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}