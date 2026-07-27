import { type ReactNode } from 'react';

interface StaticPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function StaticPageLayout({ title, children }: StaticPageLayoutProps) {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
