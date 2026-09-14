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
      partnerships: {
        heading: {
          type: String,
          default: "Our Partners",
        },
        subtext: {
          type: String,
          default: "Trusted by growing businesses across Australia",
        },
        logos: {
          type: [
            {
              url: { type: String, required: true },
              alt: { type: String, default: "" },
            },
          ],
          default: [
            { url: "/images/partnerships/partner-1.png", alt: "1st Choice Rideshare Club partner" },
            { url: "/images/partnerships/partner-2.png", alt: "Prestige Rideshare Club partner" },
            { url: "/images/partnerships/partner-3.png", alt: "PTRS Club Platinum Taxi Ride Share partner" },
            { url: "/images/partnerships/partner-4.png", alt: "Brisbane Rideshare Club partner" },
          ],
        },
      },
      process: {
        subheading: {
          type: String,
          default: "Where custom software meets boundless potential",
        },
        steps: {
          type: [
            {
              label: { type: String, required: true },
              tagline: { type: String, default: "" },
              description: { type: String, default: "" },
              includes: [{ type: String }],
              bestSuitedFor: [{ type: String }],
              boxColor: { type: String, default: "#eef2f6" },
            },
          ],
          default: [
            {
              label: "Discovery & Planning",
              tagline: "Clarity before commitment",
              description:
                "We begin every engagement with a structured discovery phase — reviewing your infrastructure, workflows, pain points and growth targets. This gives Australian businesses a clear technology roadmap before any build or migration starts.",
              includes: [
                "Stakeholder workshops and requirements gathering",
                "Infrastructure, cloud and security audit",
                "Risk assessment and prioritised recommendations",
                "Technology roadmap with timelines and milestones",
              ],
              bestSuitedFor: [
                "Businesses planning cloud migration or IT modernisation",
                "Teams unsure where to start with custom software",
                "Organisations needing a second opinion on existing IT setup",
              ],
              boxColor: "#eef2f6",
            },
            {
              label: "Architecture & Design",
              tagline: "Architecture built for scale",
              description:
                "Our architects and designers translate discovery insights into secure, scalable solution designs — covering cloud architecture, cyber security, UX flows and technical specifications aligned to your budget and compliance needs.",
              includes: [
                "Solution architecture and system diagrams",
                "UI/UX wireframes for web and SaaS products",
                "Security and compliance planning",
                "Detailed scope, milestones and cost estimates",
              ],
              bestSuitedFor: [
                "SaaS products and customer-facing web applications",
                "Multi-cloud or Microsoft 365 environments",
                "Businesses requiring ISO or industry compliance",
              ],
              boxColor: "#e8f0ea",
            },
            {
              label: "Build & Integrate",
              tagline: "Agile delivery, visible progress",
              description:
                "Engineers build in agile sprints — delivering web apps, API integrations, DevOps pipelines and custom software with regular demos. You see working features early, provide feedback often, and launch with confidence.",
              includes: [
                "Agile sprints with fortnightly demos",
                "Custom software, web apps and API integrations",
                "DevOps, CI/CD and automated testing",
                "Code reviews and documentation",
              ],
              bestSuitedFor: [
                "Startups launching MVPs or SaaS platforms",
                "Enterprises replacing legacy systems",
                "Teams needing dedicated development capacity",
              ],
              boxColor: "#eef2f6",
            },
            {
              label: "Launch & Ongoing Care",
              tagline: "Launch with ongoing care",
              description:
                "We handle production deployment, performance monitoring and proactive managed IT support — with clear SLAs, responsive helpdesk and continuous improvements so your technology keeps pace with your business.",
              includes: [
                "Production deployment and go-live support",
                "24/7 monitoring and incident response",
                "Managed IT, patching and cyber security updates",
                "Feature enhancements and scalability planning",
              ],
              bestSuitedFor: [
                "Businesses needing reliable post-launch IT support",
                "Growing teams without in-house IT staff",
                "Organisations requiring defined SLAs and uptime guarantees",
              ],
              boxColor: "#e8f0ea",
            },
          ],
        },
      },
      faq: {
        heading: {
          type: String,
          default: "Questions we hear often?",
        },
        items: {
          type: [
            {
              question: { type: String, required: true },
              answer: { type: String, default: "" },
            },
          ],
          default: [
            {
              question: "How quickly do you respond to IT support issues?",
              answer:
                "For managed IT clients, critical incidents are acknowledged within 30 minutes and urgent issues are prioritised immediately. Standard requests are handled within agreed SLA timeframes, with clear updates so you always know the status of your ticket.",
            },
            {
              question: "What services does Technaz provide?",
              answer:
                "Technaz offers managed IT, cloud solutions (Azure, AWS and Microsoft 365), cyber security, custom software development, web development, SaaS builds, DevOps and ongoing support — all from one Australian technology team.",
            },
            {
              question: "Do you work with businesses across Australia?",
              answer:
                "Yes. We support growing businesses across Australia with remote and on-site services. Whether you need cloud migration, a custom web app or day-to-day IT support, our team delivers with clear communication and no jargon.",
            },
            {
              question: "Can you help migrate our business to the cloud?",
              answer:
                "Absolutely. We plan and execute cloud migrations to Azure, AWS and Microsoft 365 — including email, file storage, backups and security. We minimise downtime and train your team so the transition is smooth.",
            },
            {
              question: "Do you build custom software or only provide managed IT?",
              answer:
                "Both. We design and build tailored software, web applications and integrations, and we also provide proactive managed IT and support. Many clients use Technaz as their single partner for building and running their technology.",
            },
            {
              question: "What does onboarding with Technaz look like?",
              answer:
                "We start with a discovery session to understand your goals, systems and pain points. From there we provide a clear roadmap, scope and timeline — then move into design, build or support depending on what your business needs.",
            },
          ],
        },
      },
      servicesBar: {
        items: {
          type: [String],
          default: [
            "Web Development",
            "SAAS Development",
            "UI UX Design",
            "SEO & E commerce",
            "Custom Software",
            "Maintenance & Support",
            "DevOps & CI/CD",
          ],
        },
      },
  },
  { timestamps: true }
);

export default mongoose.models.HomeContent ||
  mongoose.model("HomeContent", HomeContentSchema);