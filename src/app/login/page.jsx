import { getSeoSettings } from "@/lib/getSeoSettings";
import { resolveBrand } from "@/lib/brandAssets";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const seo = await getSeoSettings();
  const brand = resolveBrand(seo);
  return <LoginForm siteLogoUrl={brand.siteLogoUrl} />;
}
