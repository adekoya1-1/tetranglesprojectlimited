import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-charcoal px-4 text-center">
      {/* Brand mark */}
      <div className="mb-8 flex gap-1">
        <span className="block h-16 w-3 bg-brand-orange" />
        <span className="block h-16 w-3 bg-brand-orange opacity-65" />
        <span className="block h-16 w-3 bg-brand-orange opacity-30" />
      </div>

      <p className="font-condensed text-8xl font-black leading-none text-brand-orange md:text-[160px]">
        404
      </p>

      <h1 className="mt-4 font-condensed text-3xl font-black uppercase text-white md:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-base text-white/50">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-white/50 hover:text-white"
        >
          View Projects
        </Link>
      </div>

      {/* Orange accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-brand-orange" />
    </div>
  );
}
