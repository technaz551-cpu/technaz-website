const DEFAULT_PRODUCT_DROPDOWN = {
  column1: {
    heading: "Platforms",
    items: [],
  },
  column2: {
    heading: "Solutions",
    items: [],
  },
};

/** Build navbar product dropdown from CMS products (internal detail links). */
export function buildProductDropdownFromContent(productsContent) {
  const products = productsContent?.products || [];
  const navProducts = products.filter((p) => p.showInNav);

  if (navProducts.length === 0) {
    return null;
  }

  const headings = productsContent?.navHeadings || {};

  const toItem = (product) => ({
    label: product.title,
    href: `/products/${product.slug}`,
    logo:
      product.logo?.url ||
      product.image?.url ||
      "/images/partnerships/partner-1.png",
    external: false,
  });

  const platforms = navProducts
    .filter((p) => p.navGroup !== "solutions")
    .map(toItem);
  const solutions = navProducts
    .filter((p) => p.navGroup === "solutions")
    .map(toItem);

  return {
    column1: {
      heading: headings.platforms || DEFAULT_PRODUCT_DROPDOWN.column1.heading,
      items: platforms,
    },
    column2: {
      heading: headings.solutions || DEFAULT_PRODUCT_DROPDOWN.column2.heading,
      items: solutions,
    },
    viewAllHref: "/products",
  };
}

export { DEFAULT_PRODUCT_DROPDOWN };
