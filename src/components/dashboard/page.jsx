import { cookies } from "next/headers";
import Image from "next/image";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import LogoutButton from "@/components/dashboard/LogoutButton";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const admin = await verifyAuthToken(token);

  return (
    <main className="min-h-screen bg-brand-green-light">
      <header className="border-b border-brand-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Image
            src="/images/footer/technaz-large-logo.png"
            alt="Technaz"
            width={130}
            height={36}
            className="h-8 w-auto"
            priority
          />
          <LogoutButton />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-brand-dark md:text-3xl">
            Welcome back{admin?.name ? `, ${admin.name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-brand-gray">
            {admin?.email}
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-brand-border bg-white p-10 text-center">
          <p className="text-brand-gray">
            This is your admin dashboard. Content and tools will go here.
          </p>
        </div>
      </section>
    </main>
  );
}