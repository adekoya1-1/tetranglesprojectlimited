export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-100" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 animate-pulse rounded bg-gray-100" />
              <div className="flex-1 space-y-2">
                <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white shadow-sm ring-1 ring-gray-200">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3.5">
              <div className="space-y-1.5">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-56 animate-pulse rounded bg-gray-100" />
              </div>
              <div className="h-5 w-16 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
