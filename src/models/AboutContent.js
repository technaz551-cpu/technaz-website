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
              question: "What does TECHNAZ do?",
              answer:
                "TECHNAZ delivers software development and technology services — including custom software, web and mobile apps, product development, UI/UX design, AI automation, and Cloud & DevOps — for businesses that need reliable digital solutions.",
            },
            {
              question: "What services does TECHNAZ provide?",
              answer:
                "Our core capabilities include custom software development, web development, mobile apps, UI/UX design, AI & automation, product development, dedicated development teams, and Cloud & DevOps with CI/CD practices.",
            },
            {
              question: "Do you work with businesses across Australia?",
              answer:
                "Yes. We partner with Australian businesses remotely and on-site when needed, with clear communication, practical timelines, and documentation your team can rely on.",
            },
            {
              question: "How do new projects typically start?",
              answer:
                "We begin with discovery to understand goals, users, and constraints. You receive a scoped plan with milestones before design and development — so expectations stay aligned from day one.",
            },
            {
              question: "Do you offer support after launch?",
              answer:
                "Yes. We provide maintenance, improvements, and DevOps support so your product stays secure, performant, and ready to evolve as your business grows.",
            },
            {
              question: "Can you help us go from idea to MVP?",
              answer:
                "Absolutely. We help teams validate ideas, shape UI/UX, build an MVP, test with real users, and iterate — using a practical process designed to reduce risk and speed up learning.",
            },
          ],
        },
      },
  },
  { timestamps: true }
);

export default mongoose.models.AboutContent ||
  mongoose.model("AboutContent", AboutContentSchema);