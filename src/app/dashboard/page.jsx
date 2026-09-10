import { cookies } from "next/headers";
import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const admin = await verifyAuthToken(token);

  return (
    <section className="relative px-6 py-10 lg:px-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold leading-tight text-brand-dark md:text-3xl">
          Welcome back
          {admin?.name ? (
            <>
              , <span className="text-brand-green">{admin.name}</span>
            </>
          ) : (
            ""
          )}
        </h1>

        <div className="mt-3 flex items-center" aria-hidden="true">
          <span className="text-base leading-none text-brand-green">◆</span>
          <span className="mx-1 h-[1.5px] w-20 bg-brand-green" />
        </div>

        <p className="mt-3 text-sm text-brand-gray">{admin?.email}</p>
      </div>

      <div className="rounded-2xl border border-dashed border-brand-border bg-white p-10 text-center">
        <p className="text-brand-gray">
          This is your admin dashboard. Content and tools will go here.
        </p>
      </div>
    </section>
  );
}