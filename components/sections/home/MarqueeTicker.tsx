import { marqueeItems } from "@/constants/home";

export function MarqueeTicker() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden bg-brand-dark py-[13px]">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="px-5 text-[13px] font-medium text-white/95"
          >
            {item}
            <span className="mx-5 inline-block h-1 w-1 rounded-full bg-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
