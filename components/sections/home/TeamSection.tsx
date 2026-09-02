"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { teamSection } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { GridBackground } from "@/components/ui/GridBackground";

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="team">
      <GridBackground variant="mint" className="py-[72px] lg:py-[88px]">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[24px] font-bold text-brand-dark sm:text-[28px] lg:text-[32px]">
            {teamSection.title}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((i) =>
                  i === 0 ? teamSection.members.length - 1 : i - 1,
                )
              }
              aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark hover:border-brand-green hover:text-brand-green"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((i) =>
                  i === teamSection.members.length - 1 ? 0 : i + 1,
                )
              }
              aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark hover:border-brand-green hover:text-brand-green"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {teamSection.members.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer overflow-hidden rounded-[14px] border bg-white transition-all ${
                index === activeIndex
                  ? "border-brand-green shadow-md"
                  : "border-brand-border"
              }`}
            >
              <div className="relative flex h-[260px] items-end justify-center bg-gradient-to-b from-slate-100 to-slate-200 sm:h-[280px]">
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10px] font-medium text-brand-dark shadow-sm">
                  {member.role}
                </span>
                <div className="h-[220px] w-[170px] rounded-t-[100px] bg-gradient-to-b from-slate-300 to-slate-400 sm:h-[240px] sm:w-[190px]" />
              </div>
              <div className="border-t border-brand-border py-4 text-center">
                <p className="text-[14px] font-semibold text-brand-dark">
                  {member.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
      </GridBackground>
    </section>
  );
}
