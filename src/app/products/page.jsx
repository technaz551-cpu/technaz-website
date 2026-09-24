import dbConnect from "@/lib/dbConnect";
import ProductsContent from "@/models/ProductsContent";
import ProductsHero from "@/components/products/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Products",
  description:
    "Explore software platforms and digital products built by Technaz for rideshare clubs and growing businesses.",
  alternates: {
    canonical: `${SITE.url}/products`,
  },
};

export default async function ProductsPage() {
  await dbConnect();
  let doc = await ProductsContent.findOne({}).lean();
  if (!doc) {
    doc = (await ProductsContent.create({})).toObject();
  }
  const productsContent = JSON.parse(JSON.stringify(doc));

  return (
    <main>
      <ProductsHero content={productsContent} />
      <ProductGrid content={productsContent} />
    </main>
  );
}
