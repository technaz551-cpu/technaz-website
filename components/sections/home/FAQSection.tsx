"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqSection } from "@/constants/home";
import { Container } from "@/components/ui/Container";
import { GridBackground } from "@/components/ui/GridBackground";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <GridBackground variant="mint" className="py-[72px] lg:py-[88px]">
      <Container className="max-w-[720px]">
        <h2 className="text-center text-[24px] font-bold text-brand-dark sm:text-[28px] lg:text-[32px]">
          {faqSection.title}
        </h2>

        <div className="mt-10 space-y-3">
          {faqSection.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-[12px] border border-brand-border/80 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[14px] font-medium text-brand-dark">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-brand-green" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-brand-muted" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="border-t border-brand-border px-5 pb-4 pt-2 text-[13px] leading-relaxed text-brand-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </GridBackground>
  );
}
