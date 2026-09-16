
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Home,
  Info,
  BriefcaseBusiness,
  Menu,
  Users,
  Settings,
  ArrowUpRight,
  FileText,
  Image as ImageIcon,
  Layers3,
} from "lucide-react";

import { verifyAuthToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export const metadata = {
  title: "Dashboard",
};

const mainSections = [
  {
    title: "Home Page",
    description:
      "Manage homepage sections, content, images, partnerships and process.",
    href: "/dashboard/pages/home",
    icon: Home,
  },
  {
    title: "About Page",
    description:
      "Manage company story, mission, vision, values and FAQ content.",
    href: "/dashboard/pages/about",
    icon: Info,
  },
  {
    title: "Services",
    description:
      "Manage services, service content, features and related information.",
    href: "/dashboard/pages/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Navbar",
    description:
      "Manage navigation links and Product dropdown partner information.",
    href: "/dashboard/pages/navbar",
    icon: Menu,
  },
  {
    title: "Team",
    description:
      "Manage team members, profiles, images and team information.",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    description:
      "Manage dashboard and website related settings.",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const quickStats = [
  {
    title: "Home",
    subtitle: "Website Content",
    icon: Home,
    href: "/dashboard/pages/home",
  },
  {
    title: "About",
    subtitle: "Company Content",
    icon: Info,
    href: "/dashboard/pages/about",
  },
  {
    title: "Services",
    subtitle: "Service Content",
    icon: BriefcaseBusiness,
    href: "/dashboard/pages/services",
  },
  {
    title: "Team",
    subtitle: "Team Management",
    icon: Users,
    href: "/dashboard/team",
  },
];

const homeItems = [
  "Expertise",
  "FAQ",
  "Partnerships",
  "Process",
  "Services",
  "Services Bar",
];

const aboutItems = [
  "Story",
  "Mission",
  "Vision",
  "Value",
  "FAQ",
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const admin = await verifyAuthToken(token);

  const firstName = admin?.name
    ? admin.name.split(" ")[0]
    : "Admin";

  return (
    <section className="relative px-6 py-8 lg:px-10 lg:py-10">
      {/* Header / Welcome */}
      <div className="mb-8 overflow-hidden rounded-3xl bg-brand-dark p-7 md:p-9">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
              <Layers3 size={13} />
              Technaz CMS
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome back,{" "}
              <span className="text-brand-green">
                {firstName}
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 md:text-base">
              Manage your Technaz website content, pages, images
              and navigation from one central dashboard.
            </p>

            {admin?.email && (
              <p className="mt-4 text-xs text-white/40">
                Signed in as {admin.email}
              </p>
            )}
          </div>

          <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/5 md:flex">
            <Layers3
              size={42}
              strokeWidth={1.4}
              className="text-brand-green"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            Overview
          </p>

          <h2 className="mt-1 text-xl font-bold text-brand-dark">
            Website Management
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-brand-border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand-green/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
                    <Icon size={21} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-brand-gray transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green"
                  />
                </div>

                <h3 className="mt-5 text-sm font-bold text-brand-dark">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-brand-gray">
                  {item.subtitle}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Management */}
      <div className="mb-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            Content Management
          </p>

          <h2 className="mt-1 text-xl font-bold text-brand-dark">
            Manage Website
          </h2>

          <p className="mt-1 text-sm text-brand-gray">
            Select a section below to edit your website content.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mainSections.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-light text-brand-green transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-gray transition-all duration-300 group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold text-brand-dark">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-brand-gray">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-brand-green">
                  Open Section
                  <ArrowUpRight size={13} />
                </div>

                <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-brand-green-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Home Sections */}
        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
              <Home size={20} />
            </div>

            <div>
              <h3 className="font-bold text-brand-dark">
                Home Page Sections
              </h3>

              <p className="text-xs text-brand-gray">
                Available content modules
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {homeItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-green-light/30 px-3 py-3"
              >
                <FileText
                  size={15}
                  className="shrink-0 text-brand-green"
                />

                <span className="text-xs font-medium text-brand-dark">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/pages/home"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-green transition-colors hover:text-brand-dark"
          >
            Manage Home Page
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* About Sections */}
        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
              <Info size={20} />
            </div>

            <div>
              <h3 className="font-bold text-brand-dark">
                About Page Sections
              </h3>

              <p className="text-xs text-brand-gray">
                Available content modules
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {aboutItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-green-light/30 px-3 py-3"
              >
                <FileText
                  size={15}
                  className="shrink-0 text-brand-green"
                />

                <span className="text-xs font-medium text-brand-dark">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/pages/about"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-green transition-colors hover:text-brand-dark"
          >
            Manage About Page
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
              <ImageIcon size={20} />
            </div>

            <div>
              <h3 className="font-bold text-brand-dark">
                Media Management
              </h3>

              <p className="text-xs text-brand-gray">
                Images can be managed from individual CMS sections.
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-brand-gray">
            Upload and replace images directly from the relevant
            dashboard sections while editing your website content.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-light text-brand-green">
              <Settings size={20} />
            </div>

            <div>
              <h3 className="font-bold text-brand-dark">
                Administration
              </h3>

              <p className="text-xs text-brand-gray">
                Dashboard account
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-green-light/40 px-4 py-3">
            <div>
              <p className="text-xs text-brand-gray">
                Logged in as
              </p>

              <p className="mt-1 text-sm font-semibold text-brand-dark">
                {admin?.name || "Administrator"}
              </p>
            </div>

            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-green">
              <span className="h-2 w-2 rounded-full bg-brand-green" />
              Active
            </span>
          </div>

          <Link
            href="/dashboard/settings"
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-brand-green transition-colors hover:text-brand-dark"
          >
            Open Settings
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-brand-border pt-6 text-xs text-brand-gray sm:flex-row">
        <p>Technaz CMS Dashboard</p>

        <p>Manage your website content from one place.</p>
      </div>
    </section>
  );
}
