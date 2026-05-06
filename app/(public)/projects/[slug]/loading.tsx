export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="flex min-h-[45vh] items-end bg-brand-charcoal pb-16 pt-32">
        <div className="container-custom">
          <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
          <div className="mt-4 h-6 w-32 animate-pulse rounded bg-brand-orange/40" />
          <div className="mt-3 h-10 w-96 max-w-full animate-pulse rounded bg-white/10" />
          <div className="mt-4 flex gap-6">
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Gallery */}
            <div className="lg:col-span-2">
              <div className="aspect-video w-full animate-pulse bg-gray-200" />
              <div className="mt-2 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse bg-gray-100" />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-3">
              <div className="h-48 animate-pulse bg-gray-100" />
              <div className="h-14 animate-pulse bg-gray-200" />
              <div className="h-12 animate-pulse bg-gray-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
