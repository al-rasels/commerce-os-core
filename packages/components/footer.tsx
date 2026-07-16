import { cn } from "./utils";

export interface FooterProps {
  columns: { title: string; links: { label: string; href: string }[] }[];
  socialLinks?: { platform: "instagram" | "facebook" | "twitter" | "tiktok"; href: string }[];
  copyrightText: string;
}

const socialIconLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "X (Twitter)",
  tiktok: "TikTok",
};

export function Footer({ columns, socialLinks, copyrightText }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <div className="flex gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIconLabels[s.platform] ?? s.platform}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t pt-8">
          <p className="text-xs text-muted-foreground">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
