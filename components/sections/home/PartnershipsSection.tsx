import { Container } from "@/components/ui/Container";

export function PartnershipsSection() {
  return (
    <section className="border-y border-dashed border-brand-border bg-white py-12 lg:py-16">
      <Container>
        <h2 className="text-center text-[22px] font-bold text-brand-dark sm:text-[26px]">
          Our Partnerships
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-slate-100 sm:h-20 sm:w-20"
            >
              <div className="h-9 w-9 rounded-full bg-slate-200/90" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
