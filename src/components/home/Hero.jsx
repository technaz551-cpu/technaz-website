import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-white overflow-hidden"
    >
      {/* Grid background - left side only, full coverage */}
      <div
        className="absolute inset-y-0 left-0 w-1/2  pointer-events-none"
        style={{
          height: "664px",
          backgroundImage: "url('/images/hero/collage-02.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

<div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 md:pt-24 pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Text content */}
        <div className="relative w-full h-[400px] md:h-[480px] flex flex-col justify-center -top-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-brand-dark">
            We Build Support &amp;
            <br />
            Scale your{" "}
            <span className="text-brand-green">Technology</span>
          </h1>

          {/* Green arrow line divider */}
          <div className="mt-6 flex items-center">
            <span className="text-brand-green text-lg leading-none">◆</span>
            <span className="flex-1 h-[1.5px] bg-brand-green mx-1"></span>
            <span className="text-brand-green text-lg leading-none">➤</span>
          </div>

          <p className="mt-6 text-base text-gray-700 leading-relaxed">
            From managed IT and cloud to cyber security and custom software,{" "}
            <span className="font-bold text-brand-dark">TECHNAZ</span> gives
            growing Australian businesses one dependable technology team.
          </p>

          <Link
            href="#services"
            className="mt-8 inline-flex items-center justify-center rounded-lg border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors w-fit"
          >
            Explore Services
          </Link>
        </div>

        {/* Right: Single collage image */}
        <div className="relative w-full h-[400px] md:h-[480px]">
          <Image
            src="/images/hero/collage-01.jpg"
            alt="Technaz technology solutions collage"
            fill
            className="object-contain object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}