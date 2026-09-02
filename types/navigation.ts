export type NavItem = {
  label: string;
  href: string;
  icon?: "home" | "about" | "services" | "team" | "contact";
  children?: NavItem[];
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};
