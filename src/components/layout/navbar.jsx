"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Product", href: "/#product" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/footer/technaz-large-logo.png"
            alt="Technaz"
            width={200}
            height={40}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-brand-dark md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className="relative py-1"
                >
                  <span
                    className={
                      isActive
                        ? "text-brand-green"
                        : "text-brand-dark transition-colors hover:text-brand-green"
                    }
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-brand-green" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          onClick={() => setActiveLink("Contact")}
          className="hidden items-center justify-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark md:inline-flex"
        >
          Get a Quote
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-dark md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.label);
                      setIsOpen(false);
                    }}
                    className={
                      isActive
                        ? "block font-semibold text-brand-green"
                        : "block text-brand-dark transition-colors hover:text-brand-green"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => {
              setActiveLink("Contact");
              setIsOpen(false);
            }}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
