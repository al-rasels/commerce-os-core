"use client";

import React, { useState } from "react";

export interface NewsletterPopupProps {
  heading?: string;
  subheading?: string;
  discountCode?: string;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  heading = "Get 15% Off Your First Order",
  subheading = "Subscribe to our VIP list to unlock your discount code immediately.",
  discountCode = "WELCOME15",
}) => {
  const [open, setOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-card border rounded-2xl shadow-2xl p-6 text-card-foreground">
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground text-lg leading-none"
        >
          &times;
        </button>

        {!submitted ? (
          <div className="flex flex-col gap-4 text-center">
            <span className="text-3xl">🎁</span>
            <h3 className="text-xl font-extrabold text-foreground">{heading}</h3>
            <p className="text-xs text-muted-foreground">{subheading}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-3 mt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-muted border text-xs p-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Claim My 15% Off Code
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-center py-4">
            <span className="text-4xl">🎉</span>
            <h3 className="text-lg font-bold text-foreground">You're On The VIP List!</h3>
            <p className="text-xs text-muted-foreground">Your exclusive coupon code is:</p>
            <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg font-mono font-bold text-primary text-base">
              {discountCode}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 text-xs font-semibold text-muted-foreground hover:text-foreground underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
