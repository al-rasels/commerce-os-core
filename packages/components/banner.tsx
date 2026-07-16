import { cn } from "./utils";

export interface BannerProps {
  imageUrl: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Banner({ imageUrl, heading, ctaLabel, ctaHref }: BannerProps) {
  return (
    <section
      className="relative flex min-h-[40vh] items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white">
        {heading && (
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
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
    </section>
  );
}
