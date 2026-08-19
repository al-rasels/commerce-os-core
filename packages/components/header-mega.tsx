import React from "react";

export interface HeaderMegaProps {
  logoUrl?: string;
  sticky?: boolean;
  showCurrencySwitch?: boolean;
  promoBadge?: string;
}

export const HeaderMega: React.FC<HeaderMegaProps> = ({
  logoUrl = "/logo.svg",
  sticky = true,
  showCurrencySwitch = true,
  promoBadge = "FREE SHIPPING ON ORDERS $50+",
}) => {
  return (
    <header className={`w-full bg-background border-b z-40 ${sticky ? "sticky top-0 shadow-xs" : ""}`}>
      {promoBadge && (
        <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          {promoBadge}
        </div>
      )}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            {logoUrl && logoUrl !== "/logo.svg" ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto max-w-[140px] object-contain" />
            ) : (
              <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">CommerceOS</span>
            )}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="/products" className="hover:text-foreground transition-colors">Shop All</a>
            <a href="/categories" className="hover:text-foreground transition-colors">Categories</a>
            <a href="/b2b/quick-order" className="hover:text-foreground transition-colors">Wholesale B2B</a>
            <a href="/about" className="hover:text-foreground transition-colors">About Us</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          {showCurrencySwitch && (
            <select className="bg-muted px-2 py-1 rounded-md text-foreground border border-input focus:outline-none">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          )}
          <a href="/account/login" className="hover:text-primary transition-colors hidden sm:inline">Sign In</a>
          <a href="/cart" className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Cart (0)
          </a>
        </div>
      </div>
    </header>
  );
};
