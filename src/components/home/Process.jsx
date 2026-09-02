import Image from "next/image";

export default function Process() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* Left: Text content - top aligned with right image */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Our Process
          </h2>

          {/* Arrow line divider */}
          <div className="mt-4 flex items-center max-w-md">
            <span className="text-brand-dark text-base leading-none">◆</span>
            <span className="flex-1 h-[1.5px] bg-brand-dark mx-1"></span>
            <span className="text-brand-dark text-base leading-none">➤</span>
          </div>

          <p className="mt-4 text-base md:text-lg text-gray-700">
            Where Custom Software Meets Boundless Potential!
          </p>
        </div>

        {/* Right: Image with dashed border and Discovery badge */}
        <div className="relative h-[220px] md:h-[260px] rounded-2xl  overflow-hidden p-1">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/images/process/process-1.jpg"
              alt="Technaz development process"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Discovery badge */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-md">
            <span className="text-sm font-bold text-brand-dark tracking-wide">
              Discovery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}