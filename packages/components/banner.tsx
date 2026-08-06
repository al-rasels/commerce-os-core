"use client";

import { useState } from "react";
import { cn } from "./utils";
import { X } from "lucide-react";

export interface BannerProps {
  imageUrl?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "default" | "dismissible";
  onDismiss?: () => void;
}

export function Banner({
  imageUrl,
  heading,
  description,
  ctaLabel,
  ctaHref,
  variant = "default",
  onDismiss,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    onDismiss?.();
    setDismissed(true);
  };

  const content = (
    <div className="relative z-10 flex flex-col items-center text-center text-white">
      {heading && (
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
      )}
      {description && (
        <p className="mt-2 text-sm text-white/80 sm:text-base">{description}</p>
      )}
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black shadow transition-all hover:brightness-110 active:scale-95"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );

  if (imageUrl) {
    return (
      <section
        className="relative flex min-h-[40vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        {variant === "dismissible" && (
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={handleDismiss}
            className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        {content}
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[40vh] items-center justify-center bg-muted">
      {variant === "dismissible" && (
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {content}
    </section>
  );
}
