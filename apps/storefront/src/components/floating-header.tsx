"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { CartBadge } from "@/components/cart-badge";
import { SearchAutocomplete } from "@/components/search-autocomplete";

export function FloatingHeader() {
  const { scrollY } = useScroll();
  const [isFloating, setIsFloating] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsFloating(true);
    } else {
      setIsFloating(false);
    }
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 flex justify-center ${
        isFloating 
          ? "py-4" 
          : "py-0 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div 
        className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          isFloating 
            ? "mx-4 h-14 w-full max-w-5xl rounded-full border border-border/40 bg-background/70 backdrop-blur-xl shadow-lg px-6" 
            : "container mx-auto h-16 max-w-7xl px-6"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          <ShoppingBag className="w-6 h-6 text-primary" />
          <span className={isFloating ? "hidden sm:inline" : ""}>Commerce<span className="text-muted-foreground">OS</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Categories
          </Link>
        </nav>
        <div className={`flex-1 mx-8 hidden ${isFloating ? "lg:hidden" : "lg:block"} max-w-sm`}>
          <SearchAutocomplete />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/account" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Account
          </Link>
          <CartBadge />
        </div>
      </div>
    </motion.header>
  );
}
