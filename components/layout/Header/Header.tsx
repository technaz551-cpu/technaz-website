"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { MainNav, MobileMenu } from "./MainNav";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition(10);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="sticky top-0 z-40 w-full"
    >
      <MainNav
        isScrolled={isScrolled}
        onMobileMenuOpen={() => setMobileMenuOpen(true)}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </motion.header>
  );
}
