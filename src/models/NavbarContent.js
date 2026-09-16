import mongoose from "mongoose";

const DropdownItemSchema = {
  label: { type: String, required: true },
  href: { type: String, required: true },
  logo: { type: String, default: "" },
};

const NavbarContentSchema = new mongoose.Schema(
  {
    productDropdown: {
      column1: {
        heading: { type: String, default: "Platforms" },
        items: {
          type: [DropdownItemSchema],
          default: [
            {
              label: "PRESTIGE RIDESHARE CLUB",
              href: "https://prestigerideshareclub.com.au/",
              logo: "/images/partnerships/partner-1.png",
            },
            {
              label: "PTRS CLUB",
              href: "https://www.ptrsclub.com.au/",
              logo: "/images/partnerships/partner-2.png",
            },
            {
              label: "Brisbane Rideshare Club",
              href: "https://thebrc.com.au/",
              logo: "/images/partnerships/partner-3.png",
            },
          ],
        },
      },
      column2: {
        heading: { type: String, default: "Solutions" },
        items: {
          type: [DropdownItemSchema],
          default: [
            {
              label: "CHOICE RIDESHARE CLUB",
              href: "https://fcrc.au/",
              logo: "/images/partnerships/partner-4.png",
            },
            {
              label: "PRESTIGE RIDESHARE CLUB",
              href: "https://prestigerideshareclub.com.au/",
              logo: "/images/partnerships/partner-1.png",
            },
            {
              label: "PTRS CLUB",
              href: "https://www.ptrsclub.com.au/",
              logo: "/images/partnerships/partner-2.png",
            },
          ],
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.NavbarContent ||
  mongoose.model("NavbarContent", NavbarContentSchema);