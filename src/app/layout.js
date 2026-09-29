import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import StoreProvider from "@/components/providers/StoreProvider";
import SeoScripts from "@/components/seo/SeoScripts";
import MetaPixelHead from "@/components/seo/MetaPixelHead";
import { getSeoSettings, buildRootMetadata } from "@/lib/getSeoSettings";
import dbConnect from "@/lib/dbConnect";
import NavbarContent from "@/models/NavbarContent";
import ProductsContent from "@/models/ProductsContent";
import { getContactContent } from "@/lib/getContactContent";
import "./globals.css";
import { cmsDynamic } from "@/lib/cmsDynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const seo = await getSeoSettings();
  return buildRootMetadata(seo);
}

export default async function RootLayout({ children }) {
  cmsDynamic();
  await dbConnect();
  const [navbarDoc, seo, contactContent] = await Promise.all([
    NavbarContent.findOne({}).lean(),
    getSeoSettings(),
    getContactContent(),
  ]);
  let productsDoc = await ProductsContent.findOne({}).lean();
  if (!productsDoc) {
    productsDoc = (await ProductsContent.create({})).toObject();
  }
  const navbarContent = JSON.parse(JSON.stringify(navbarDoc));
  const productsContent = JSON.parse(JSON.stringify(productsDoc));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <MetaPixelHead seo={seo} />
      </head>
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <SeoScripts seo={seo} />
        <StoreProvider>
          <Navbar content={navbarContent} productsContent={productsContent} />
          {children}
          <Footer contactContent={contactContent} />
        </StoreProvider>
      </body>
    </html>
  );
}
