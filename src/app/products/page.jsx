import dbConnect from "@/lib/dbConnect";
import ProductsContent from "@/models/ProductsContent";
import ProductsHero from "@/components/products/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import { getSeoSettings } from "@/lib/getSeoSettings";
import {
  buildPageMetadata,
  STATIC_PAGE_SEO,
} from "@/lib/pageMetadata";

export async function generateMetadata() {
  const seo = await getSeoSettings();
  return buildPageMetadata(seo, STATIC_PAGE_SEO.products);
}

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
