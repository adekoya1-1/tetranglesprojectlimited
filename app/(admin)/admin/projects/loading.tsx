export default function ProjectsAdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-9 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-9 w-36 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="h-10 flex-1 animate-pulse rounded bg-gray-100" />
        <div className="h-10 w-40 animate-pulse rounded bg-gray-100" />
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-200">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex gap-8">
            {["Project", "Category", "Year", "Visible", "Actions"].map((h) => (
              <div key={h} className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="h-10 w-14 animate-pulse bg-gray-100" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />
              </div>
              <div className="h-5 w-20 animate-pulse rounded bg-gray-100" />
              <div className="h-5 w-12 animate-pulse rounded bg-gray-100" />
              <div className="flex gap-2">
                <div className="h-7 w-7 animate-pulse rounded bg-gray-100" />
                <div className="h-7 w-7 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
