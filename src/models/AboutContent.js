import mongoose from "mongoose";

const AboutContentSchema = new mongoose.Schema(
  {
    hero: {
      title: {
        type: String,
        default: "About Technaz",
      },
      description: {
        type: String,
        default:
          "We're an Australian technology partner empowering businesses to operate securely, scale with confidence, and maximize the value of their IT investments through reliable, innovative, and future-ready technology solutions.",
      },
      image: {
        url: { type: String, default: "/images/about/hero-vr.png" },
        alt: {
          type: String,
          default: "Technaz — future-ready technology",
        },
      },
    },
    story: {
        eyebrow: {
          type: String,
          default: "About Us",
        },
        heading: {
          type: String,
          default: "Our Story",
        },
        description: {
          type: String,
          default:
            "At Technaz, we pioneer in crafting innovative strategies and providing tailored solutions perfect for your business needs. From initial vision and conceptualization to streamlined execution, we transform your unique ideas into impactful and brand-elevating results.",
        },
        badgeText: {
          type: String,
          default: "Innovate",
        },
        image: {
          url: { type: String, default: "/images/about/story.jpg" },
          alt: { type: String, default: "Technaz team collaborating" },
        },
      },
      mission: {
        eyebrow: {
          type: String,
          default: "Our Purpose",
        },
        heading: {
          type: String,
          default: "Mission",
        },
        description: {
          type: String,
          default:
            "Empowering growing Australian businesses with enterprise-grade technology that is practical, scalable, and cost-effective—helping you streamline operations, enhance productivity, embrace digital transformation, and scale with confidence.",
        },
        badgeText: {
          type: String,
          default: "Innovate",
        },
        image: {
          url: { type: String, default: "/images/about/mission.jpg" },
          alt: { type: String, default: "Technaz team in a strategy meeting" },
        },
      },
      value: {
        eyebrow: {
          type: String,
          default: "Our Values",
        },
        heading: {
          type: String,
          default: "Value",
        },
        description: {
          type: String,
          default:
            "At Technaz, we pioneer in crafting innovative strategies and providing tailored solutions perfect for your business needs. From initial vision and conceptualization to streamlined execution, we transform your unique ideas into impactful and brand-elevating results.",
        },
        badgeText: {
          type: String,
          default: "Innovate",
        },
        image: {
          url: { type: String, default: "/images/about/value.jpg" },
          alt: { type: String, default: "Technaz team collaborating" },
        },
      },
      vision: {
        eyebrow: {
          type: String,
          default: "Our Direction",
        },
        heading: {
          type: String,
          default: "Vision",
        },
        description: {
          type: String,
          default:
            "Empowering growing Australian businesses with enterprise-grade technology that is practical, scalable, and cost-effective—helping you streamline operations, enhance productivity, embrace digital transformation, and scale with confidence.",
        },
        badgeText: {
          type: String,
          default: "Innovate",
        },
        image: {
          url: { type: String, default: "/images/about/vision.jpg" },
          alt: { type: String, default: "Technaz team collaborating" },
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
  },
  { timestamps: true }
);

export default mongoose.models.AboutContent ||
  mongoose.model("AboutContent", AboutContentSchema);