import Link from 'next/link';
import { ArrowLeft, FileSearch } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileSearch className="w-7 h-7 text-muted-foreground" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Page not found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Go home
      </Link>
    </div>
  );
}
