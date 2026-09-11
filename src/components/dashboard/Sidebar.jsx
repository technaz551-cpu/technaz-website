"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  ChevronDown,
} from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Home",
    icon: Home,
    basePath: "/dashboard/pages/home",
    children: [
      { label: "Hero Section", href: "/dashboard/pages/home" },
      { label: "Services", href: "/dashboard/pages/home/services" },
      { label: "Expertise", href: "/dashboard/pages/home/expertise" },
    ],
  },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
    const activeGroup = NAV_ITEMS.find(
      (item) => item.children && pathname.startsWith(item.basePath)
    );
    if (activeGroup) setOpenGroup(activeGroup.label);
  }, [pathname]);

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <Image
          src="/images/footer/technaz-large-logo.png"
          alt="Technaz"
          width={200}
          height={40}
          className="h-5 w-auto"
          priority
        />
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            const isGroupActive = pathname.startsWith(item.basePath);
            const isOpen = openGroup === item.label;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setOpenGroup(isOpen ? null : item.label)}
                  className={`relative flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isGroupActive
                      ? "text-brand-green"
                      : "text-brand-dark hover:text-brand-green"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.label}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  {isGroupActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-brand-green" />
                  )}
                </button>

                {isOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-4">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            isChildActive
                              ? "font-semibold text-brand-green"
                              : "text-brand-gray hover:text-brand-green"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-brand-green"
                  : "text-brand-dark hover:text-brand-green"
              }`}
            >
              <Icon size={18} />
              {item.label}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-brand-green" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 px-4 py-4">
        <LogoutButton />
      </div>
    </aside>
  );
}