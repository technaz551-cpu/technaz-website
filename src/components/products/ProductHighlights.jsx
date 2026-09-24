import { Check } from "lucide-react";

export default function ProductHighlights({ highlights }) {
  if (!highlights?.length) return null;

  return (
    <section className="border-t border-brand-border/60 bg-brand-green-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-brand-dark sm:text-2xl md:text-3xl">
            Key responsibilities
          </h2>
          <div
            className="mt-3 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-base leading-none text-brand-green">◆</span>
            <span className="mx-2 h-[1.5px] w-16 bg-brand-green sm:w-24" />
            <span className="text-base leading-none text-brand-green">➤</span>
          </div>
          <p className="mt-4 text-sm text-brand-gray md:text-base">
            What this platform delivers for members, operators, and stakeholders.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {highlights.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
            >
              <span
                className="absolute left-0 top-0 h-1 w-full bg-brand-green/80 transition-all group-hover:bg-brand-green"
                aria-hidden="true"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-light text-brand-green">
                <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-dark/90 md:text-[15px] md:leading-7">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
