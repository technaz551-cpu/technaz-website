"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { expertiseSection, processSection } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { GridBackground } from "@/components/ui/GridBackground";
import { LogoWatermark } from "@/components/ui/Logo";

type SplitSectionProps = {
  title: string;
  description: string;
  cta?: string;
  ctaHref?: string;
  showWatermark?: boolean;
  reversed?: boolean;
  mint?: boolean;
};

function SplitSection({
  title,
  description,
  cta,
  ctaHref = "/contact",
  showWatermark = false,
  reversed = false,
  mint = false,
}: SplitSectionProps) {
  const content = (
    <Container>
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${reversed ? "lg:[direction:rtl]" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, x: reversed ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`max-w-[440px] ${reversed ? "lg:[direction:ltr]" : ""}`}
        >
          <h2 className="text-[26px] font-bold text-brand-dark sm:text-[30px] lg:text-[34px]">
            {title}
          </h2>
          <p className="mt-4 text-[14px] leading-[1.75] text-brand-muted lg:text-[15px]">
            {description}
          </p>
          {cta && (
            <Link
              href={ctaHref}
              className="mt-6 inline-flex h-[42px] items-center gap-1.5 rounded-[10px] border border-brand-dark/20 bg-white px-5 text-[14px] font-medium text-brand-dark transition-all hover:border-brand-green hover:text-brand-green"
            >
              {cta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reversed ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className={reversed ? "lg:[direction:ltr]" : ""}
        >
          <div className="relative h-[260px] overflow-hidden rounded-[14px] bg-gradient-to-br from-slate-500 to-slate-800 sm:h-[300px] lg:h-[340px]">
            <div className="absolute inset-0 flex items-end p-5">
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm"
                  />
                ))}
              </div>
            </div>
            {showWatermark && (
              <div className="absolute bottom-4 left-4 rounded-md bg-black/30 px-2.5 py-1 backdrop-blur-sm">
                <LogoWatermark />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Container>
  );

  if (mint) {
    return (
      <GridBackground variant="mint" className="py-[72px] lg:py-[88px]">
        {content}
      </GridBackground>
    );
  }

  return <section className="bg-white py-[72px] lg:py-[88px]">{content}</section>;
}

export function ExpertiseSection() {
  return (
    <SplitSection
      mint
      title={expertiseSection.title}
      description={expertiseSection.description}
      cta={expertiseSection.cta}
      showWatermark
    />
  );
}

export function ProcessSection() {
  return (
    <SplitSection
      title={processSection.title}
      description={processSection.description}
      reversed
    />
  );
}
