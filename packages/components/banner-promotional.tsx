"use client";

import React, { useState, useEffect } from "react";

export interface BannerPromotionalProps {
  heading?: string;
  subheading?: string;
  couponCode?: string;
  ctaLabel?: string;
  ctaHref?: string;
  targetHours?: number;
}

export const BannerPromotional: React.FC<BannerPromotionalProps> = ({
  heading = "⚡ Flash Sale Ends Soon!",
  subheading = "Use coupon code SUMMER30 for 30% off orders over $100.",
  couponCode = "SUMMER30",
  ctaLabel = "Claim Discount",
  ctaHref = "/products",
  targetHours = 24,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: targetHours, minutes: 59, seconds: 59 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCoupon = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full py-8 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-black tracking-tight mb-1">{heading}</h3>
          <p className="text-xs md:text-sm text-orange-100">{subheading}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-1 font-mono text-center">
            <div className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-md min-w-12">
              <span className="text-base font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="block text-[9px] uppercase text-orange-200">Hours</span>
            </div>
            <span className="text-lg font-bold">:</span>
            <div className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-md min-w-12">
              <span className="text-base font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="block text-[9px] uppercase text-orange-200">Mins</span>
            </div>
            <span className="text-lg font-bold">:</span>
            <div className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-md min-w-12">
              <span className="text-base font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="block text-[9px] uppercase text-orange-200">Secs</span>
            </div>
          </div>
          {couponCode && (
            <button
              onClick={copyCoupon}
              className="bg-black/40 border border-white/30 text-xs px-3 py-2 rounded-md font-mono hover:bg-black/60 transition-colors cursor-pointer"
            >
              {copied ? "Copied! ✓" : `Code: ${couponCode}`}
            </button>
          )}
          <a
            href={ctaHref}
            className="bg-white text-orange-600 hover:bg-orange-50 px-5 py-2 rounded-md font-bold text-xs shadow-md transition-colors"
          >
            {ctaLabel} &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
