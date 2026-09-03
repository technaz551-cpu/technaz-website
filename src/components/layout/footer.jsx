import Link from "next/link";
import Image from "next/image";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Product", href: "/#product" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  "Managed IT",
  "Cloud Solutions",
  "Cyber Security",
  "Custom Software",
  "Web Development",
  "DevOps & Support",
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "/images/footer/instagram.png",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "/images/footer/facebook.png",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/images/footer/linkedin.png",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#303747] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/images/footer/technaz-small-logo.png"
                alt="Technaz"
                width={165}
                height={30}
                className="h-auto w-[165px]"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">
              Australia&apos;s trusted technology partner — we build, support
              and scale IT for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-brand-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Our Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-sm text-white/75 transition-colors hover:text-brand-green"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href="mailto:hello@technaz.com.au"
                  className="transition-colors hover:text-brand-green"
                >
                  hello@technaz.com.au
                </a>
              </li>
              <li>Australia-wide support</li>
              <li>Mon – Fri, 8:00am – 6:00pm AEST</li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-90"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dashed border-[#858b96] pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-white/60 sm:flex-row sm:text-left">
            <p>&copy; {new Date().getFullYear()} Technaz. All rights reserved.</p>
            <p>Managed IT &amp; Custom Software for Australian Businesses</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
