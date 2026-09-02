"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How quickly do you respond to issues?",
  },
  {
    question: "How quickly do you respond to issues?",
  },
  {
    question: "How quickly do you respond to issues?",
  },
  {
    question: "How quickly do you respond to issues?",
  },
  {
    question: "How quickly do you respond to issues?",
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    console.log("User Answer Submitted:", {
      question: item.question,
      answer: userAnswer,
    });

    setUserAnswer("");
  };

  return (
    <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-semibold text-brand-dark">
          {item.question}
        </span>
        <Plus
          size={20}
          className={`shrink-0 text-brand-dark transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pt-3 flex gap-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 text-sm border border-brand-border rounded-lg px-3 py-2 outline-none focus:border-brand-green"
          />
          <button
            onClick={handleSubmit}
            className="text-sm font-semibold text-white bg-brand-green px-4 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
          >
            Submit
          </button>
        </div>
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
    <section className="bg-grid-green py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark text-center mb-10">
          Questions we hear often?
        </h2>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
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