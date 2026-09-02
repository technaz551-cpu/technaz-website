"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactSection } from "@/constants/home";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  return (
    <section className="bg-white py-[72px] lg:py-[88px]">
      <Container className="max-w-[640px]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[24px] font-bold leading-snug text-brand-dark sm:text-[28px] lg:text-[32px]"
        >
          {contactSection.title}{" "}
          <span className="text-brand-green">
            {contactSection.titleHighlight}
          </span>
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder={contactSection.fields.name.placeholder}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-[48px] w-full rounded-[12px] border border-brand-border bg-white px-4 text-[14px] text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
            <input
              type="email"
              placeholder={contactSection.fields.email.placeholder}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-[48px] w-full rounded-[12px] border border-brand-border bg-white px-4 text-[14px] text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
            />
          </div>

          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="h-[48px] w-full rounded-[12px] border border-brand-border bg-white px-4 text-[14px] text-brand-muted focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <option value="">{contactSection.fields.service.placeholder}</option>
            {contactSection.services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <textarea
            rows={5}
            placeholder={contactSection.fields.message.placeholder}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full resize-none rounded-[12px] border border-brand-border bg-white px-4 py-3 text-[14px] text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
          />

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="inline-flex h-[46px] min-w-[160px] items-center justify-center rounded-[10px] bg-brand-green px-8 text-[14px] font-semibold text-white transition-colors hover:bg-brand-green-dark"
            >
              {contactSection.submit}
            </button>
          </div>
        </motion.form>
      </Container>
    </section>
  );
}
