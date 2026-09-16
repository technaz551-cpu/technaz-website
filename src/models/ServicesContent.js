import mongoose from "mongoose";

const ServicesContentSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "Our Services",
      },
      description: {
        type: String,
        default:
          "From product strategy to engineering and long-term optimization, TECHNAZ provides the technology capabilities businesses need to build and scale.",
      },
      image: {
        url: { type: String, default: "/images/services/hero-woman.png" },
        alt: { type: String, default: "Technaz services" },
      },
    },
    features: {
      type: [
        {
          title: { type: String, required: true },
          slug: { type: String, required: true },
          description: { type: String, default: "" },
          image: {
            url: { type: String, required: true },
            alt: { type: String, default: "" },
          },
        },
      ],
      default: [
        {
          title: "Custom Software Development",
          slug: "custom-software-development",
          description:
            "We design and engineer tailored software solutions around the way your business actually operates—from intelligent internal platforms and automated workflow systems to scalable customer-facing applications that improve efficiency, enhance experiences, and support long-term growth.",
          image: {
            url: "/images/services/process-1.jpg",
            alt: "Developer building custom software at a multi-monitor workstation",
          },
        },
        {
          title: "Web Development",
          slug: "web-development",
          description:
            "We build fast, accessible, and search-optimized web experiences using modern technologies and frameworks—designed to deliver seamless user experiences, strengthen digital visibility, and drive measurable business results.",
          image: {
            url: "/images/services/service-4.jpg",
            alt: "Web development and coding on a laptop in a modern workspace",
          },
        },
        {
          title: "Mobile App Development",
          slug: "mobile-app-development",
          description:
            "We create native and cross-platform mobile applications that feel fast, intuitive, and reliable—built around real user journeys so your customers can book, buy, and engage from anywhere, with the same quality they expect from your web experience.",
          image: {
            url: "/images/services/service-3.jpg",
            alt: "Team collaborating on mobile and software development around a laptop",
          },
        },
        {
          title: "UI/UX Design",
          slug: "ui-ux-design",
          description:
            "We design clear, conversion-focused interfaces that make complex products feel simple—from research and wireframes through to polished visual systems that keep every screen consistent, accessible, and aligned with how your customers actually work.",
          image: {
            url: "/images/services/expertise-2.jpg",
            alt: "UI/UX design and solution architecture workshop",
          },
        },
        {
          title: "AI & Automation",
          slug: "ai-automation",
          description:
            "We help businesses automate repetitive work and add intelligent features where they create real value—from workflow automation and data-driven tools to practical AI integrations that reduce manual effort, improve accuracy, and scale with your operations.",
          image: {
            url: "/images/services/service-1.jpg",
            alt: "Technology operations and automation monitoring in a workspace",
          },
        },
        {
          title: "Dedicated Development Teams",
          slug: "dedicated-development-teams",
          description:
            "We provide dedicated engineers who work as an extension of your team—aligned to your tools, timelines, and product goals so you can scale delivery without the overhead of hiring, onboarding, and managing a full in-house development function.",
          image: {
            url: "/images/services/expertise-3.jpg",
            alt: "Dedicated software development team collaborating on a product",
          },
        },
        {
          title: "Cloud & DevOps",
          slug: "cloud-devops",
          description:
            "We design, migrate, and operate cloud environments with reliable CI/CD and infrastructure practices—so releases are faster, systems stay secure, and your platforms can scale as demand grows across Azure, AWS, and Microsoft 365.",
          image: {
            url: "/images/services/service-2.jpg",
            alt: "Cloud infrastructure and DevOps operations for growing businesses",
          },
        },
        {
          title: "Product Development",
          slug: "product-development",
          description:
            "We take products from idea to launch with a clear path through discovery, design, build, and iteration—helping you validate features early, ship with confidence, and keep improving after go-live with the same team that built it.",
          image: {
            url: "/images/services/expertise-4.jpg",
            alt: "Product development and launch support in a modern workspace",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.ServicesContent ||
  mongoose.model("ServicesContent", ServicesContentSchema);