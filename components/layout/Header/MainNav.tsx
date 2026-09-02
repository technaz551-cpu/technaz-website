"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Building2,
  Briefcase,
  Users,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavItems } from "@/constants/navigation";
import type { NavItem } from "@/types/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navIcons = {
  home: Home,
  about: Building2,
  services: Briefcase,
  team: Users,
  contact: Mail,
};

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon ? navIcons[item.icon] : null;

  return (
    <Link
      href={item.href}
      className="group flex items-center gap-1.5 text-[14px] font-medium text-brand-dark/75 transition-colors hover:text-brand-green"
    >
      {Icon && (
        <Icon className="h-3.5 w-3.5 text-brand-green/80 group-hover:text-brand-green" />
      )}
      {item.label}
    </Link>
  );
}

type MainNavProps = {
  onMobileMenuOpen: () => void;
  isScrolled: boolean;
};

export function MainNav({ onMobileMenuOpen, isScrolled }: MainNavProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        isScrolled
          ? "border-b border-brand-border/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white",
      )}
    >
      <Container>
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center lg:h-[80px]">
          <Logo size="lg" />

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {mainNavItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-[10px] bg-brand-green px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-green-dark sm:inline-flex"
            >
              Get a Quote
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={onMobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-brand-border px-6">
              <Logo size="md" />
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              {mainNavItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={onClose}
                >
                  <NavLink item={item} />
                  <div className="my-4 border-b border-gray-50" />
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-brand-border p-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-[10px] bg-brand-green text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
