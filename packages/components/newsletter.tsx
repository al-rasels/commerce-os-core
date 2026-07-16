import { cn } from "./utils";

export interface NewsletterProps {
  heading: string;
  subheading?: string;
  placeholderText?: string;
}

export function Newsletter({
  heading,
  subheading,
  placeholderText = "Enter your email",
}: NewsletterProps) {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{subheading}</p>
        )}
        <form
          className="mt-8 flex gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={placeholderText}
            required
            className="h-12 flex-1 rounded-full border bg-background px-5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:brightness-110 active:scale-95"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
