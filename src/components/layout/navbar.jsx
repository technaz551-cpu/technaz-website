"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Product", href: "/#product" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home"); // default active

  return (
    <header className="w-full bg-white border-b border-gray-100 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 shrink-0"
        >
          <span className="text-2xl font-bold tracking-tight text-brand-dark">
            TECH
            <span className="text-brand-green">N</span>
            <span className="text-brand-green">▲</span>
            Z
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-dark">
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
                        : "text-brand-dark hover:text-brand-green transition-colors"
                    }
                  >
                    {link.label}
                  </span>

                  {/* Active underline indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-brand-green rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button (desktop) */}
        <Link
          href="/#contact"
          onClick={() => setActiveLink("Contact")}
          className="hidden md:inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors"
        >
          Get a Quote
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-brand-dark"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4">
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
                        ? "block text-brand-green font-semibold"
                        : "block text-brand-dark hover:text-brand-green transition-colors"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/#contact"
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