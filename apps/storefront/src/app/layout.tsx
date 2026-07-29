import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartBadge } from "@/components/cart-badge";
import { SearchAutocomplete } from "@/components/search-autocomplete";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { TenantThemeProvider } from "@/components/tenant-theme-provider";
import { serverApi } from "@/lib/server-api";
import { Footer } from "@commerceos/components";
import { FloatingHeader } from "@/components/floating-header";

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
          <FloatingHeader />
          <div className="pt-16">
            <main className="flex-1 flex flex-col min-h-screen">{children}</main>
          </div>
          
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
