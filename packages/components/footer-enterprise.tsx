import React from "react";

export interface FooterEnterpriseProps {
  companyName?: string;
  description?: string;
  copyright?: string;
  showNewsletter?: boolean;
  showPaymentIcons?: boolean;
}

export const FooterEnterprise: React.FC<FooterEnterpriseProps> = ({
  companyName = "CommerceOS Retail Inc.",
  description = "The modern multi-tenant e-commerce platform powering high-growth brands.",
  copyright = "© 2026 CommerceOS. All rights reserved.",
  showNewsletter = true,
  showPaymentIcons = true,
}) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-100 pt-12 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-lg text-white">{companyName}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white mb-3">Shop Categories</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="/products" className="hover:text-white transition-colors">All Collections</a></li>
            <li><a href="/products?sort=new" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="/products?sort=bestseller" className="hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="/b2b/quick-order" className="hover:text-white transition-colors">Wholesale B2B</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-white mb-3">Customer Support</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><a href="/faq" className="hover:text-white transition-colors">Help Center & FAQ</a></li>
            <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Support</a></li>
            <li><a href="/account" className="hover:text-white transition-colors">Order Tracking</a></li>
          </ul>
        </div>
        {showNewsletter && (
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm text-white">Join Our VIP Newsletter</h4>
            <p className="text-xs text-slate-400">Subscribe for early product drops & exclusive discounts.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-slate-800 border border-slate-700 text-xs px-3 py-2 rounded-md text-white placeholder-slate-500 focus:outline-none flex-1"
              />
              <button type="submit" className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-md hover:bg-primary/90">
                Join
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>{copyright}</p>
        {showPaymentIcons && (
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-slate-400">
            <span className="px-2 py-1 bg-slate-800 rounded">Visa</span>
            <span className="px-2 py-1 bg-slate-800 rounded">Mastercard</span>
            <span className="px-2 py-1 bg-slate-800 rounded">Amex</span>
            <span className="px-2 py-1 bg-slate-800 rounded">Apple Pay</span>
            <span className="px-2 py-1 bg-slate-800 rounded">Stripe</span>
          </div>
        )}
      </div>
    </footer>
  );
};
