import { siteConfig } from "@/constants/site";
import { Container } from "@/components/ui/Container";
import { Logo, LogoLarge } from "@/components/ui/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";

const socialLinks = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-brand-dark py-12 lg:py-14">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <Logo variant="light" size="lg" />
              <p className="mt-5 max-w-[280px] text-[13px] leading-[1.7] text-white/55">
                {siteConfig.contact.address}
                <br />
                {siteConfig.contact.email}
              </p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all hover:border-brand-green hover:text-brand-green"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="overflow-hidden bg-white py-12 lg:py-16">
        <Container>
          <LogoLarge />
          <p className="mt-5 text-center text-[11px] text-brand-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
