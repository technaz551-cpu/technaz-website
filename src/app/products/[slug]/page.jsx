import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import ProductsContent from "@/models/ProductsContent";
import { SITE } from "@/lib/site";
import { stripHtml } from "@/lib/stripHtml";
import ProductDetailHero from "@/components/products/ProductDetailHero";
import ProductHighlights from "@/components/products/ProductHighlights";
import MoreProducts from "@/components/products/MoreProducts";

export async function generateStaticParams() {
  await dbConnect();
  const content = await ProductsContent.findOne({}).lean();
  const products = content?.products || [];
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  const content = await ProductsContent.findOne({}).lean();
  const product = content?.products?.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const plain =
    product.excerpt ||
    stripHtml(product.description).slice(0, 160);

  return {
    title: product.title,
    description: plain,
    alternates: {
      canonical: `${SITE.url}/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  await dbConnect();
  const content = JSON.parse(
    JSON.stringify(await ProductsContent.findOne({}).lean())
  );

  const products = content?.products || [];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white">
      <ProductDetailHero product={product} />
      <ProductHighlights highlights={product.highlights} />
      <MoreProducts products={products} currentSlug={slug} />
    </main>
  );
}
