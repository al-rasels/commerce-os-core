import { Skeleton } from "@commerceos/components";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="border-b border-border/50 py-4 mb-8">
        <div className="container mx-auto px-6">
          <Skeleton className="h-5 w-64" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          <div className="flex flex-col gap-4 relative">
            <div className="sticky top-24">
              <Skeleton className="aspect-[4/5] md:aspect-square w-full rounded-2xl mb-4" />
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square w-20 rounded-lg shrink-0" />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Skeleton className="h-5 w-32 mb-3" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-10 w-40 mb-8" />
            
            <div className="space-y-3 mb-10">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="mb-8 space-y-6">
              <Skeleton className="h-5 w-24 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>

            <div className="pb-8 border-b border-border/50 mb-8">
              <Skeleton className="h-14 w-full rounded-xl mb-4" />
              <div className="flex gap-8 mt-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
