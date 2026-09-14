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
  },
  { timestamps: true }
);

export default mongoose.models.AboutContent ||
  mongoose.model("AboutContent", AboutContentSchema);