import mongoose from "mongoose";

const ImageSchema = {
  url: { type: String, default: "" },
  alt: { type: String, default: "" },
};

const ProductSchema = {
  title: { type: String, required: true },
  slug: { type: String, required: true },
  excerpt: { type: String, default: "" },
  description: { type: String, default: "" },
  highlights: { type: [String], default: [] },
  externalUrl: { type: String, default: "" },
  showInNav: { type: Boolean, default: false },
  navGroup: {
    type: String,
    enum: ["platforms", "solutions"],
    default: "platforms",
  },
  image: { type: ImageSchema, default: () => ({}) },
  logo: { type: ImageSchema, default: () => ({}) },
};

const DEFAULT_PRODUCTS = [
  {
    title: "Prestige Rideshare Club",
    slug: "prestige-rideshare-club",
    excerpt:
      "Premium rideshare membership platform built for drivers who want a professional club experience.",
    description:
      "Prestige Rideshare Club is a dedicated platform for rideshare drivers seeking structured membership, support, and community. Technaz engineered the product to handle onboarding, member services, and a polished public presence that reflects the brand's premium positioning.",
    highlights: [
      "Member onboarding and account management",
      "Public marketing site integrated with club operations",
      "Scalable architecture for growing driver communities",
    ],
    externalUrl: "https://prestigerideshareclub.com.au/",
    showInNav: true,
    navGroup: "platforms",
    logo: {
      url: "/images/partnerships/partner-1.png",
      alt: "Prestige Rideshare Club",
    },
    image: {
      url: "/images/partnerships/partner-1.png",
      alt: "Prestige Rideshare Club platform",
    },
  },
  {
    title: "PTRS Club",
    slug: "ptrs-club",
    excerpt:
      "Platinum Taxi Ride Share club software connecting drivers with reliable tools and support.",
    description:
      "PTRS Club delivers a focused digital experience for taxi and rideshare members. The product combines clear information architecture with dependable performance so members can access services quickly on any device.",
    highlights: [
      "Responsive web experience for members",
      "Brand-aligned UI across key journeys",
      "Maintainable codebase for ongoing feature releases",
    ],
    externalUrl: "https://www.ptrsclub.com.au/",
    showInNav: true,
    navGroup: "platforms",
    logo: {
      url: "/images/partnerships/partner-2.png",
      alt: "PTRS Club",
    },
    image: {
      url: "/images/partnerships/partner-2.png",
      alt: "PTRS Club platform",
    },
  },
  {
    title: "Brisbane Rideshare Club",
    slug: "brisbane-rideshare-club",
    excerpt:
      "Regional rideshare club platform tailored for the Brisbane driver community.",
    description:
      "Brisbane Rideshare Club (The BRC) gives local drivers a dedicated home online—clear program information, membership pathways, and a trustworthy brand experience backed by solid engineering and hosting practices.",
    highlights: [
      "Localised content and membership flows",
      "Fast, mobile-friendly pages",
      "Secure deployment and ongoing support",
    ],
    externalUrl: "https://thebrc.com.au/",
    showInNav: true,
    navGroup: "platforms",
    logo: {
      url: "/images/partnerships/partner-3.png",
      alt: "Brisbane Rideshare Club",
    },
    image: {
      url: "/images/partnerships/partner-3.png",
      alt: "Brisbane Rideshare Club platform",
    },
  },
  {
    title: "Choice Rideshare Club",
    slug: "choice-rideshare-club",
    excerpt:
      "Flexible rideshare club solution designed for choice-driven driver programs.",
    description:
      "Choice Rideshare Club supports drivers with a streamlined digital platform—emphasising clarity, accessibility, and reliable performance so members can focus on their work while the technology handles the rest.",
    highlights: [
      "Program information and lead capture",
      "Consistent branding across touchpoints",
      "Built for iteration as programs evolve",
    ],
    externalUrl: "https://fcrc.au/",
    showInNav: true,
    navGroup: "solutions",
    logo: {
      url: "/images/partnerships/partner-4.png",
      alt: "Choice Rideshare Club",
    },
    image: {
      url: "/images/partnerships/partner-4.png",
      alt: "Choice Rideshare Club platform",
    },
  },
];

const ProductsContentSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "Our Products" },
      description: {
        type: String,
        default:
          "Software platforms and digital products engineered by Technaz—built to launch, scale, and support real-world communities and businesses.",
      },
      image: {
        url: { type: String, default: "/images/services/expertise-4.jpg" },
        alt: { type: String, default: "Technaz digital products" },
      },
    },
    navHeadings: {
      platforms: { type: String, default: "Platforms" },
      solutions: { type: String, default: "Solutions" },
    },
    products: {
      type: [ProductSchema],
      default: DEFAULT_PRODUCTS,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProductsContent ||
  mongoose.model("ProductsContent", ProductsContentSchema);
