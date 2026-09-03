import Link from "next/link";
import Image from "next/image";

const COLLAGE_IMAGES = [
  {
    src: "/images/hero/collage-03.jpg",
    alt: "Software development and coding at Technaz",
    className:
      "absolute top-0 left-0 h-[44%] w-[54%] hero-animate-collage hero-animate-collage-delay-1",
  },
  {
    src: "/images/hero/collage-04.jpg",
    alt: "Business analytics and technology monitoring",
    className:
      "absolute top-[6%] right-0 h-[46%] w-[52%] hero-animate-collage hero-animate-collage-delay-2",
  },
  {
    src: "/images/hero/collage-05.jpg",
    alt: "Modern workspace and collaboration tools",
    className:
      "absolute bottom-[12%] left-[4%] h-[42%] w-[50%] hero-animate-collage hero-animate-collage-delay-3",
  },
  {
    src: "/images/hero/collage-06.jpg",
    alt: "Professional IT support and development team",
    className:
      "absolute bottom-0 right-[2%] h-[44%] w-[54%] hero-animate-collage hero-animate-collage-delay-4",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex flex-col overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-light md:inset-y-0 md:right-1/2 md:w-1/2"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-10 md:px-6 md:py-12 lg:gap-14 lg:px-10 lg:py-16">
        <div className="relative z-10 flex flex-col justify-center md:pr-6 lg:pr-10">
          <h1 className="hero-animate-title text-[1.75rem] font-bold leading-[1.15] text-brand-dark min-[400px]:text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl xl:text-[3.25rem]">
            We Build Support &amp;
            <br />
            Scale your{" "}
            <span className="text-brand-green">Technology</span>
          </h1>

          <div className="mt-4 flex items-center sm:mt-5 md:mt-6" aria-hidden="true">
            <span className="hero-animate-accent text-base leading-none text-brand-green sm:text-lg">
              ◆
            </span>
            <span className="hero-animate-line mx-1 h-[1.5px] flex-1 bg-brand-green" />
            <span className="hero-animate-accent text-base leading-none text-brand-green sm:text-lg">
              ➤
            </span>
          </div>

          <p className="hero-animate-desc mt-4 max-w-lg text-sm leading-relaxed text-gray-700 sm:mt-5 sm:text-base md:mt-6">
            From managed IT and cloud to cyber security and custom software,{" "}
            <strong className="font-bold text-brand-dark">TECHNAZ</strong> gives
            growing Australian businesses one dependable technology team.
          </p>

          <Link
            href="#services"
            className="hero-animate-cta mt-6 inline-flex w-fit items-center justify-center rounded-lg border border-brand-dark px-5 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white sm:mt-8 sm:px-6 sm:py-3"
          >
            Explore Services
          </Link>
        </div>

        <div className="relative mx-auto h-[clamp(220px,34dvh,300px)] w-full max-w-sm sm:max-w-md sm:h-[clamp(260px,36dvh,340px)] md:mx-0 md:h-[clamp(360px,52dvh,560px)] md:max-w-none lg:h-[clamp(420px,58dvh,600px)]">
          {COLLAGE_IMAGES.map((image) => (
            <div
              key={image.src}
              className={`overflow-hidden rounded-xl shadow-sm sm:rounded-2xl ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
