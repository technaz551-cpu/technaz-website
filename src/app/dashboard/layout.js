import Sidebar from "@/components/dashboard/Sidebar";
import DashboardAuthInit from "@/components/dashboard/DashboardAuthInit";
import { getSeoSettings } from "@/lib/getSeoSettings";
import { resolveBrand } from "@/lib/brandAssets";

export default async function DashboardLayout({ children }) {
  const seo = await getSeoSettings();
  const brand = resolveBrand(seo);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar brand={brand} />
      <main className="bg-grid-light relative min-h-0 flex-1 overflow-y-auto">
        <DashboardAuthInit />
        {children}
      </main>
    </div>
  );
}
