import { cn } from "./utils";

export interface RichTextProps {
  content: string;
}

export function RichText({ content }: RichTextProps) {
  return (
    <section className="mx-auto max-w-3xl py-12">
      <div
        className="prose prose-sm dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
