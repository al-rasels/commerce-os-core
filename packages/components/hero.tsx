import { cn } from "./utils";

export interface HeroProps {
  variant: "modern" | "luxury" | "minimal" | "editorial";
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
  alignment?: "left" | "center" | "right";
}

const variantStyles: Record<HeroProps["variant"], string> = {
  modern: "bg-gradient-to-br from-primary/10 via-background to-primary/5",
  luxury: "bg-gradient-to-r from-amber-950/90 via-amber-900/80 to-amber-950/90 text-white",
  minimal: "bg-background border-b",
  editorial: "bg-zinc-900 text-white",
};

const alignmentStyles: Record<NonNullable<HeroProps["alignment"]>, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

export function Hero({
  variant,
  heading,
  subheading,
  ctaLabel,
  ctaHref,
  backgroundImage,
  alignment = "center",
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[60vh] flex-col justify-center px-6 py-24",
        variantStyles[variant],
        alignmentStyles[alignment],
      )}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div className={cn("max-w-3xl", alignment === "center" && "mx-auto")}>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subheading}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <div className={cn("mt-10 flex gap-4", alignment === "center" && "justify-center")}>
            <a
              href={ctaHref}
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
