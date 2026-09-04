import Image from "next/image";

export default function Story() {
  return (
    <section className="bg-brand-green-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Our story
          </h2>
          <div className="mt-3 h-px w-full max-w-xs bg-brand-dark" />
          <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed max-w-md">
            At Technaz, we pioneer in crafting innovative strategies and
            providing tailored solutions perfect for your business needs.
            From initial vision and conceptualization to streamlined
            execution, we transform your unique ideas into impactful and
            brand-elevating results.
          </p>
        </div>

        <div className="relative h-[220px] md:h-[260px] w-full md:w-[90%] md:ml-auto rounded-2xl overflow-hidden p-1">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/images/about/story.jpg"
              alt="Technaz team collaborating"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
            <span className="text-sm font-bold text-brand-dark tracking-wide">
              INNOVATE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}