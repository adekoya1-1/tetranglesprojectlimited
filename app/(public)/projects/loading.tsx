function CardSkeleton() {
  return (
    <div className="overflow-hidden bg-white shadow-card">
      <div className="h-56 animate-pulse bg-gray-200 md:h-64" />
      <div className="p-6">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 flex gap-4">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="flex min-h-[40vh] items-end bg-brand-charcoal pb-16 pt-32">
        <div className="container-custom">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-12 w-64 animate-pulse rounded bg-white/10" />
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
