"use client";

import React, { useState, useEffect } from "react";

export interface SlideItem {
  id: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  bgImage?: string;
  bgColor?: string;
}

export interface HeroSliderProps {
  slides?: SlideItem[];
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const defaultSlides: SlideItem[] = [
  {
    id: "1",
    heading: "Summer Collection 2026",
    subheading: "Discover premium handcrafted apparel designed for modern living.",
    ctaLabel: "Shop Collection",
    ctaHref: "/products",
    bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    heading: "Next-Gen Tech Essentials",
    subheading: "High-performance gear built for productivity and speed.",
    ctaLabel: "Explore Tech",
    ctaHref: "/products",
    bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&auto=format&fit=crop&q=80",
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides = defaultSlides,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length || autoplaySpeed <= 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [slides.length, autoplaySpeed]);

  if (!slides.length) return null;

  const activeSlide = slides[current] || slides[0];

  return (
    <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-75 scale-105"
        style={{ backgroundImage: `url(${activeSlide.bgImage || ""})`, backgroundColor: activeSlide.bgColor || "#090d16" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight animate-fade-in">
          {activeSlide.heading}
        </h1>
        <p className="text-sm md:text-lg text-slate-200 mb-8 max-w-xl font-normal">
          {activeSlide.subheading}
        </p>
        <div>
          <a
            href={activeSlide.ctaHref}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
          >
            {activeSlide.ctaLabel} &rarr;
          </a>
        </div>
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-xs transition-colors"
          >
            &larr;
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-xs transition-colors"
          >
            &rarr;
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${idx === current ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
