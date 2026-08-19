"use client";

import React, { useState } from "react";

export interface HeaderTopBarProps {
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundColor?: string;
  textColor?: string;
  closable?: boolean;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  message = "🔥 Summer Sale: Up to 50% Off Selected Items!",
  ctaLabel = "Shop Sale",
  ctaHref = "/products",
  backgroundColor = "#0f172a",
  textColor = "#ffffff",
  closable = true,
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="w-full py-2 px-4 text-xs font-medium flex items-center justify-center relative gap-3 transition-all"
      style={{ backgroundColor, color: textColor }}
    >
      <span>{message}</span>
      {ctaLabel && (
        <a
          href={ctaHref}
          className="underline underline-offset-2 hover:opacity-80 font-semibold"
        >
          {ctaLabel} &rarr;
        </a>
      )}
      {closable && (
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 text-sm leading-none"
          aria-label="Close announcement"
        >
          &times;
        </button>
      )}
    </div>
  );
};
