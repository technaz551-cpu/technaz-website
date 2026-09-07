import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FEATURES = {
  "custom-software-development": {
    title: "Custom Software Development",
    description:
      "We design and engineer tailored software solutions around the way your business actually operates—from intelligent internal platforms and automated workflow systems to scalable customer-facing applications that improve efficiency, enhance experiences, and support long-term growth.",
    imageSrc: "/images/services/process-1.jpg",
  },
  "web-development": {
    title: "Web Development",
    description:
      "We build fast, accessible, and search-optimized web experiences using modern technologies and frameworks—designed to deliver seamless user experiences, strengthen digital visibility, and drive measurable business results.",
    imageSrc: "/images/services/service-4.jpg",
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description:
      "We create native and cross-platform mobile applications that feel fast, intuitive, and reliable—built around real user journeys so your customers can book, buy, and engage from anywhere, with the same quality they expect from your web experience.",
    imageSrc: "/images/services/service-3.jpg",
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    description:
      "We design clear, conversion-focused interfaces that make complex products feel simple—from research and wireframes through to polished visual systems that keep every screen consistent, accessible, and aligned with how your customers actually work.",
    imageSrc: "/images/services/expertise-2.jpg",
  },
  "ai-automation": {
    title: "AI & Automation",
    description:
      "We help businesses automate repetitive work and add intelligent features where they create real value—from workflow automation and data-driven tools to practical AI integrations that reduce manual effort, improve accuracy, and scale with your operations.",
    imageSrc: "/images/services/service-1.jpg",
  },
  "dedicated-development-teams": {
    title: "Dedicated Development Teams",
    description:
      "We provide dedicated engineers who work as an extension of your team—aligned to your tools, timelines, and product goals so you can scale delivery without the overhead of hiring, onboarding, and managing a full in-house development function.",
    imageSrc: "/images/services/expertise-3.jpg",
  },
  "cloud-devops": {
    title: "Cloud & DevOps",
    description:
      "We design, migrate, and operate cloud environments with reliable CI/CD and infrastructure practices—so releases are faster, systems stay secure, and your platforms can scale as demand grows across Azure, AWS, and Microsoft 365.",
    imageSrc: "/images/services/service-2.jpg",
  },
  "product-development": {
    title: "Product Development",
    description:
      "We take products from idea to launch with a clear path through discovery, design, build, and iteration—helping you validate features early, ship with confidence, and keep improving after go-live with the same team that built it.",
    imageSrc: "/images/services/expertise-4.jpg",
  },
};

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = FEATURES[slug];

  if (!service) {
    notFound();
  }

  const otherServices = Object.entries(FEATURES).filter(
    ([key]) => key !== slug
  );

  return (
    <main className="bg-white">
      {/* Hero section - grid background + image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 h-full pointer-events-none bg-grid-light" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-gray hover:text-brand-green transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>

            <h1 className="mt-5 text-3xl md:text-4xl font-bold text-brand-dark">
              {service.title}
            </h1>

            {/* Arrow line divider */}
            <div className="mt-4 flex items-center max-w-md">
              <span className="text-brand-green text-base leading-none">◆</span>
              <span className="flex-1 h-[1.5px] bg-brand-green mx-1"></span>
              <span className="text-brand-green text-base leading-none">➤</span>
            </div>

            <p className="mt-5 text-sm md:text-base text-brand-gray leading-relaxed max-w-md">
              {service.description}
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center justify-center rounded-lg border border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Right: Image with dashed border */}
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] rounded-2xl  overflow-hidden p-1">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={service.imageSrc}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-brand-green-light py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
            Ready to discuss your {service.title.toLowerCase()} project?
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">
            Tell us what you&apos;re working on and we&apos;ll get back to you
            with next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Explore other services */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-xl md:text-2xl font-bold text-brand-dark text-center">
            Explore Other Services
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map(([key, item]) => (
              <Link
                key={key}
                href={`/services/${key}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-brand-border px-5 py-4 hover:border-brand-green hover:bg-brand-green-light transition-colors"
              >
                <span className="text-sm font-semibold text-brand-dark">
                  {item.title}
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-brand-gray group-hover:text-brand-green group-hover:translate-x-1 transition-all"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}