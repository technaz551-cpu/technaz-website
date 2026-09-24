import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: {
      url: { type: String, default: "" },
      alt: { type: String, default: "" },
    },
    author: { type: String, default: "Technaz Team" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

BlogPostSchema.index({ published: 1, publishedAt: -1 });

export default mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);
