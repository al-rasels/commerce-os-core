import { Skeleton } from "@commerceos/components";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-muted/30 border-b border-border/50 py-12 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6 mt-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <Skeleton className="h-6 w-24 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </aside>
          
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-40" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="aspect-square w-full rounded-2xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
