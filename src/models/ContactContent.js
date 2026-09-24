import mongoose from "mongoose";
import {
  CONTACT_MAP_EMBED_SRC,
  CONTACT_ADDRESS,
} from "@/lib/contact.constants";

const OfficeSchema = {
  name: { type: String, required: true },
  country: { type: String, default: "" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  mapEmbedUrl: { type: String, default: "" },
  openingHours: { type: String, default: "" },
  isPrimaryMap: { type: Boolean, default: false },
};

const EmailSchema = {
  label: { type: String, default: "General" },
  value: { type: String, required: true },
};

const SocialLinkSchema = {
  label: { type: String, required: true },
  href: { type: String, required: true },
  icon: { type: String, default: "/images/footer/linkedin.png" },
};

const DEFAULT_OFFICES = [
  {
    name: "Australia — Campbellfield",
    country: "Australia",
    address: CONTACT_ADDRESS,
    phone: "",
    email: "hello@technaz.com.au",
    mapEmbedUrl: CONTACT_MAP_EMBED_SRC,
    openingHours: "Mon – Fri, 8:00am – 6:00pm AEST",
    isPrimaryMap: true,
  },
  {
    name: "Pakistan",
    country: "Pakistan",
    address: "Add your Pakistan office address",
    phone: "",
    email: "hello@technaz.com.au",
    mapEmbedUrl: "",
    openingHours: "Mon – Fri, 9:00am – 6:00pm PKT",
    isPrimaryMap: false,
  },
];

const ContactContentSchema = new mongoose.Schema(
  {
    hero: {
      titleLine1: {
        type: String,
        default: "Ready to Discuss How We Can",
      },
      titleLine2: {
        type: String,
        default: "Help Your Business Grow?",
      },
    },
    emails: {
      type: [EmailSchema],
      default: [{ label: "General enquiries", value: "hello@technaz.com.au" }],
    },
    offices: {
      type: [OfficeSchema],
      default: DEFAULT_OFFICES,
    },
    socialLinks: {
      type: [SocialLinkSchema],
      default: [
        {
          label: "Instagram",
          href: "https://instagram.com",
          icon: "/images/footer/instagram.png",
        },
        {
          label: "Facebook",
          href: "https://facebook.com",
          icon: "/images/footer/facebook.png",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com",
          icon: "/images/footer/linkedin.png",
        },
      ],
    },
    footerBlurb: {
      type: String,
      default:
        "Australia's trusted technology partner — we build, support and scale IT for growing businesses.",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactContent ||
  mongoose.model("ContactContent", ContactContentSchema);
