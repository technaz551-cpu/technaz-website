import ServiceSplit from "@/components/services/ServiceSplit";

const FEATURES = [
  {
    title: "Custom Software Development",
    description:
      "We design and engineer tailored software solutions around the way your business actually operates—from intelligent internal platforms and automated workflow systems to scalable customer-facing applications that improve efficiency, enhance experiences, and support long-term growth.",
    imageSrc: "/images/services/process-1.jpg",
    imageAlt:
      "Developer building custom software at a multi-monitor workstation",
  },
  {
    title: "Web Development",
    description:
      "We build fast, accessible, and search-optimized web experiences using modern technologies and frameworks—designed to deliver seamless user experiences, strengthen digital visibility, and drive measurable business results.",
    imageSrc: "/images/services/service-4.jpg",
    imageAlt: "Web development and coding on a laptop in a modern workspace",
  },
  {
    title: "Mobile App Development",
    description:
      "We create native and cross-platform mobile applications that feel fast, intuitive, and reliable—built around real user journeys so your customers can book, buy, and engage from anywhere, with the same quality they expect from your web experience.",
    imageSrc: "/images/services/service-3.jpg",
    imageAlt:
      "Team collaborating on mobile and software development around a laptop",
  },
  {
    title: "UI/UX Design",
    description:
      "We design clear, conversion-focused interfaces that make complex products feel simple—from research and wireframes through to polished visual systems that keep every screen consistent, accessible, and aligned with how your customers actually work.",
    imageSrc: "/images/services/expertise-2.jpg",
    imageAlt: "UI/UX design and solution architecture workshop",
  },
  {
    title: "AI & Automation",
    description:
      "We help businesses automate repetitive work and add intelligent features where they create real value—from workflow automation and data-driven tools to practical AI integrations that reduce manual effort, improve accuracy, and scale with your operations.",
    imageSrc: "/images/services/service-1.jpg",
    imageAlt: "Technology operations and automation monitoring in a workspace",
  },
  {
    title: "Dedicated Development Teams",
    description:
      "We provide dedicated engineers who work as an extension of your team—aligned to your tools, timelines, and product goals so you can scale delivery without the overhead of hiring, onboarding, and managing a full in-house development function.",
    imageSrc: "/images/services/expertise-3.jpg",
    imageAlt: "Dedicated software development team collaborating on a product",
  },
  {
    title: "Cloud & DevOps",
    description:
      "We design, migrate, and operate cloud environments with reliable CI/CD and infrastructure practices—so releases are faster, systems stay secure, and your platforms can scale as demand grows across Azure, AWS, and Microsoft 365.",
    imageSrc: "/images/services/service-2.jpg",
    imageAlt: "Cloud infrastructure and DevOps operations for growing businesses",
  },
  {
    title: "Product Development",
    description:
      "We take products from idea to launch with a clear path through discovery, design, build, and iteration—helping you validate features early, ship with confidence, and keep improving after go-live with the same team that built it.",
    imageSrc: "/images/services/expertise-4.jpg",
    imageAlt: "Product development and launch support in a modern workspace",
  },
];

export default function ServiceFeatures() {
  return (
    <section className="bg-brand-green-light -mt-5 pt-8 sm:pt-10 pb-12 sm:pb-16 md:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-16 px-4 sm:px-6 md:gap-24 lg:px-10">
        {FEATURES.map((feature, index) => (
          <ServiceSplit
            key={feature.title}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}