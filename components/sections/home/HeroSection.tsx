"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { heroContent } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { GridBackground } from "@/components/ui/GridBackground";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

function HeroCollage() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[420px] lg:mx-0 lg:h-[460px] lg:max-w-none">
      {/* Top-left: code screen */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-0 top-0 z-10 h-[145px] w-[46%] overflow-hidden rounded-[14px] shadow-md sm:h-[165px]"
      >
        <div className="h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-3">
          <div className="font-mono text-[8px] leading-relaxed text-emerald-400 sm:text-[9px]">
            <span className="text-violet-400">import</span> {"{ tech }"}{" "}
            <span className="text-violet-400">from</span>{" "}
            <span className="text-amber-300">&apos;@technaz&apos;</span>
          </div>
        </div>
      </motion.div>

      {/* Center: charts / workspace */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute left-[18%] top-[90px] z-20 h-[175px] w-[64%] overflow-hidden rounded-[14px] shadow-lg sm:top-[100px] sm:h-[195px]"
      >
        <div className="flex h-full flex-col justify-end bg-gradient-to-br from-slate-200 via-slate-100 to-white p-4">
          <div className="mb-3 h-16 rounded-lg bg-white shadow-sm" />
          <div className="flex gap-1.5">
            {[35, 55, 40, 70, 48].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-brand-green/50"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom-right: laptop / typing */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 1.5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-0 right-0 z-30 h-[190px] w-[58%] overflow-hidden rounded-[14px] shadow-xl sm:h-[210px]"
      >
        <div className="flex h-full items-end bg-gradient-to-t from-slate-700 via-slate-500 to-slate-400 p-5">
          <div className="h-[70%] w-full rounded-lg bg-slate-800/90" />
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <GridBackground className="overflow-hidden pb-16 pt-10 lg:pb-20 lg:pt-14">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <div className="max-w-[500px]">
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[32px] font-bold leading-[1.18] tracking-tight text-brand-dark sm:text-[40px] lg:text-[48px] xl:text-[52px]"
            >
              {heroContent.headline}{" "}
              <span className="text-brand-green">{heroContent.highlight}</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-5 max-w-[440px] text-[15px] leading-[1.7] text-brand-muted"
            >
              {heroContent.description}
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-8">
              <Link
                href="/contact"
                className="inline-flex h-[46px] items-center gap-2 rounded-[10px] border border-brand-dark/20 bg-white px-6 text-[14px] font-medium text-brand-dark shadow-sm transition-all hover:border-brand-green hover:text-brand-green"
              >
                {heroContent.cta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <HeroCollage />
        </div>
      </Container>
    </GridBackground>
  );
}
