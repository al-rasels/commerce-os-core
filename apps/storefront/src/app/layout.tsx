import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartBadge } from "@/components/cart-badge";
import { SearchAutocomplete } from "@/components/search-autocomplete";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { TenantThemeProvider } from "@/components/tenant-theme-provider";
import { serverApi } from "@/lib/server-api";
import { Footer } from "@commerceos/components";
import { ShoppingBag } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Commerce OS Storefront",
  description: "Modern premium commerce platform",
};

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/new" },
      { label: "Featured", href: "/featured" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resolvedTheme = await serverApi.experience.getTheme().catch(() => undefined);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TenantThemeProvider theme={resolvedTheme?.data || resolvedTheme}>
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <span>Commerce<span className="text-muted-foreground">OS</span></span>
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
              <div className="flex-1 max-w-sm mx-8 hidden lg:block">
                <SearchAutocomplete />
              </div>
              <div className="flex items-center gap-4">
                <Link href="/account" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  Account
                </Link>
                <CartBadge />
              </div>
            </div>
          </header>
          
          <main className="flex-1 flex flex-col">{children}</main>
          
          <Footer 
            columns={footerColumns} 
            copyrightText={`© ${new Date().getFullYear()} Commerce OS. All rights reserved.`}
            socialLinks={[
              { platform: "instagram", href: "#" },
              { platform: "twitter", href: "#" },
            ]}
          />
          </TenantThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
