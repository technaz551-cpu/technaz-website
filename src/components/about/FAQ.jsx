"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How quickly do you respond to IT support issues?",
    answer:
      "For managed IT clients, critical incidents are acknowledged within 30 minutes and urgent issues are prioritised immediately. Standard requests are handled within agreed SLA timeframes, with clear updates so you always know the status of your ticket.",
  },
  {
    question: "What services does Technaz provide?",
    answer:
      "Technaz offers managed IT, cloud solutions (Azure, AWS and Microsoft 365), cyber security, custom software development, web development, SaaS builds, DevOps and ongoing support — all from one Australian technology team.",
  },
  {
    question: "Do you work with businesses across Australia?",
    answer:
      "Yes. We support growing businesses across Australia with remote and on-site services. Whether you need cloud migration, a custom web app or day-to-day IT support, our team delivers with clear communication and no jargon.",
  },
  {
    question: "Can you help migrate our business to the cloud?",
    answer:
      "Absolutely. We plan and execute cloud migrations to Azure, AWS and Microsoft 365 — including email, file storage, backups and security. We minimise downtime and train your team so the transition is smooth.",
  },
  {
    question: "Do you build custom software or only provide managed IT?",
    answer:
      "Both. We design and build tailored software, web applications and integrations, and we also provide proactive managed IT and support. Many clients use Technaz as their single partner for building and running their technology.",
  },
  {
    question: "What does onboarding with Technaz look like?",
    answer:
      "We start with a discovery session to understand your goals, systems and pain points. From there we provide a clear roadmap, scope and timeline — then move into design, build or support depending on what your business needs.",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl bg-white px-6 py-4 shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-brand-dark md:text-base">
          {item.question}
        </span>
        <Plus
          size={20}
          className={`shrink-0 text-brand-dark transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "240px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pt-3 text-sm leading-relaxed text-brand-gray md:text-base md:leading-7">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-grid-green pb-16 pt-8 md:pb-20 md:pt-10"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2
          id="faq-heading"
          className="mb-6 text-center text-2xl font-bold text-brand-dark md:mb-8 md:text-3xl"
        >
          Questions we hear often?
        </h2>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
