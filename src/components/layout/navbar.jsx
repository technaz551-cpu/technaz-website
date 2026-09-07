
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Product", href: "/product" },
  { label: "Contact", href: "/contact" },
];

const PRODUCT_DROPDOWN = {
  column1: {
    items: [
      {
        label: "PRESTIGE RIDESHARE CLUB",
        href: "/product/prestige-rideshare-club",
        logo: "/images/partnerships/partner-1.png",
      },
      {
        label: "PTRS CLUB",
        href: "/product/platinum-taxi-ride-share-club",
        logo: "/images/partnerships/partner-2.png",
      },
      {
        label: "Brisbane Rideshare Club",
        href: "/product/bristane-rideshare-club",
        logo: "/images/partnerships/partner-3.png",
      },
    ],
  },

  column2: {
    items: [
      {
        label: "CHOICE RIDESHARE CLUB",
        href: "/product/choice-rideshare-club",
        logo: "/images/partnerships/partner-4.png",
      },
      {
        label: "PRESTIGE RIDESHARE CLUB",
        href: "/product/prestige-rideshare-club",
        logo: "/images/partnerships/partner-1.png",
      },
      {
        label: "PTRS CLUB",
        href: "/product/platinum-taxi-ride-share-club",
        logo: "/images/partnerships/partner-2.png",
      },
    ],
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="relative w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/footer/technaz-large-logo.png"
            alt="Technaz"
            width={200}
            height={40}
            priority
            className="h-4 w-auto md:h-5"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-brand-dark md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            {/* Product */}
            if (link.label === "Product") {
              return (
                <li key={link.label} className="relative">
                  <button
                    type="button"
                    className="relative flex items-center gap-1 py-1"
                    onClick={() =>
                      setIsProductOpen((prev) => !prev)
                    }
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

                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        isProductOpen ? "rotate-180" : ""
                      } ${
                        isActive
                          ? "text-brand-green"
                          : "text-brand-dark"
                      }`}
                    />

                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-brand-green" />
                    )}
                  </button>

                  {/* Product Dropdown */}
                  {isProductOpen && (
                    <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
                      <div className="w-[650px] rounded-2xl border border-gray-100 bg-white p-7 shadow-2xl">
                        <div className="grid grid-cols-2 gap-10">
                          {/* Platforms */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray">
                              {PRODUCT_DROPDOWN.column1.heading}
                            </h4>

                            <div className="mt-4 flex flex-col gap-2">
                              {PRODUCT_DROPDOWN.column1.items.map(
                                (item) => (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() =>
                                      setIsProductOpen(false)
                                    }
                                    className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                                  >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                                      <Image
                                        src={item.logo}
                                        alt={item.label}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-contain"
                                      />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold text-brand-dark transition-colors group-hover:text-brand-green">
                                        {item.label}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>

                          {/* Solutions */}
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gray">
                              {PRODUCT_DROPDOWN.column2.heading}
                            </h4>

                            <div className="mt-4 flex flex-col gap-2">
                              {PRODUCT_DROPDOWN.column2.items.map(
                                (item) => (
                                  <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() =>
                                      setIsProductOpen(false)
                                    }
                                    className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-gray-50"
                                  >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                                      <Image
                                        src={item.logo}
                                        alt={item.label}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-contain"
                                      />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold text-brand-dark transition-colors group-hover:text-brand-green">
                                        {item.label}
                                      </p>
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            {/* Other Navigation Links */}
            return (
              <li key={link.label}>
                <Link href={link.href} className="relative py-1">
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

        {/* Desktop Get a Quote */}
        <Link
          href="/contact"
          className="hidden items-center justify-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark md:inline-flex"
        >
          Get a Quote
        </Link>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
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

          {/* Mobile Get a Quote */}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}


