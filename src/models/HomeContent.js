import mongoose from "mongoose";

const HomeContentSchema = new mongoose.Schema(
  {
    hero: {
      headline: {
        type: String,
        default: "We Build Support & Scale your",
      },
      highlightWord: {
        type: String,
        default: "Technology",
      },
      description: {
        type: String,
        default:
          "From managed IT and cloud to cyber security and custom software, TECHNAZ gives growing Australian businesses one dependable technology team.",
      },
      ctaText: {
        type: String,
        default: "Explore Services",
      },
      images: [
        {
          url: { type: String, required: true },
          alt: { type: String, default: "" },
        },
      ],
    },
    services: {
      heading: {
        type: String,
        default: "Services built around your business",
      },
      description1: {
        type: String,
        default:
          "Technaz is your single technology partner for managed IT, cloud solutions, cyber security and custom software development. We help growing Australian businesses simplify their IT stack, reduce downtime, and scale with confidence — from day-to-day support and DevOps to web development, SaaS builds and UI/UX design.",
      },
      description2: {
        type: String,
        default:
          "Every engagement comes with clear SLAs, transparent communication and no jargon — so your team always knows what is happening, what it costs, and what comes next.",
      },
      items: {
        type: [
          {
            title: { type: String, required: true },
            desc: { type: String, default: "" },
            image: {
              url: { type: String, required: true },
              alt: { type: String, default: "" },
            },
          },
        ],
        default: [
          {
            title: "Managed IT",
            desc: "Proactive monitoring and support for your entire infrastructure.",
            image: {
              url: "/images/services/service-1.jpg",
              alt: "Managed IT services and infrastructure monitoring by Technaz Australia",
            },
          },
          {
            title: "Cloud Solutions",
            desc: "Migration, optimisation and management across Azure, AWS and Microsoft 365.",
            image: {
              url: "/images/services/service-2.jpg",
              alt: "Cloud solutions and Microsoft 365 migration services in Australia",
            },
          },
          {
            title: "Custom Software",
            desc: "Tailored applications built around how your business actually works.",
            image: {
              url: "/images/services/service-3.jpg",
              alt: "Custom software development tailored for Australian businesses",
            },
          },
          {
            title: "Web Development",
            desc: "Fast, modern websites and web apps built for growth.",
            image: {
              url: "/images/services/service-4.jpg",
              alt: "Professional web development and SaaS application building",
            },
          },
        ],
      },
    },
    expertise: {
        slides: {
          type: [
            {
              label: { type: String, required: true },
              phase: { type: String, required: true },
              description: { type: String, default: "" },
              bgColor: { type: String, default: "#d9ecd0" },
              image: {
                url: { type: String, required: true },
                alt: { type: String, default: "" },
              },
            },
          ],
          default: [
            {
              label: "DISCOVER",
              phase: "Discovery & Assessment",
              description:
                "We map your infrastructure, workflows and growth goals to build a clear technology roadmap — identifying risks, gaps and quick wins for Australian businesses ready to modernise.",
              bgColor: "#d9ecd0",
              image: {
                url: "/images/expertise/expertise-1.jpg",
                alt: "Technaz discovery workshop assessing business IT requirements in Australia",
              },
            },
            {
              label: "DESIGN",
              phase: "Solution Design",
              description:
                "Our architects design secure, scalable systems across cloud, cyber security and custom software — aligned to your budget, compliance needs and long-term business objectives.",
              bgColor: "#dbe6f7",
              image: {
                url: "/images/expertise/expertise-2.jpg",
                alt: "Technaz solution design for cloud, security and custom software architecture",
              },
            },
            {
              label: "DEVELOP",
              phase: "Agile Development",
              description:
                "Engineers deliver web applications, SaaS platforms, API integrations and DevOps pipelines using agile sprints — so you see progress early and launch with confidence.",
              bgColor: "#f3dde0",
              image: {
                url: "/images/expertise/expertise-3.jpg",
                alt: "Technaz software development team building web apps and integrations",
              },
            },
            {
              label: "DEPLOY & SUPPORT",
              phase: "Deploy & Ongoing Support",
              description:
                "We deploy, monitor and maintain your environment with proactive managed IT, clear SLAs and responsive support — keeping your team productive long after go-live.",
              bgColor: "#e7f3de",
              image: {
                url: "/images/expertise/expertise-4.jpg",
                alt: "Technaz managed IT support and deployment for growing businesses",
              },
            },
          ],
        },
      },
  },
  { timestamps: true }
);

export default mongoose.models.HomeContent ||
  mongoose.model("HomeContent", HomeContentSchema);