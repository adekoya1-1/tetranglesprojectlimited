export default function PublicLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          <span className="block h-10 w-2 animate-pulse bg-brand-orange" style={{ animationDelay: "0ms" }} />
          <span className="block h-10 w-2 animate-pulse bg-brand-orange opacity-65" style={{ animationDelay: "150ms" }} />
          <span className="block h-10 w-2 animate-pulse bg-brand-orange opacity-30" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">
          Loading…
        </p>
      </div>
    </div>
  );
}
