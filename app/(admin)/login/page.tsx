import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-charcoal px-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #E03A1A,
            #E03A1A 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <Image
            src="/logos.jpeg"
            alt="Tetrangles Projects Limited"
            width={160}
            height={64}
            className="h-16 w-auto object-contain"
            priority
          />
          <p className="text-xs uppercase tracking-widest text-white/40">
            Admin Portal
          </p>
        </div>

        <Suspense fallback={
          <div className="bg-white/5 p-8 ring-1 ring-white/10">
            <div className="h-8 w-32 animate-pulse rounded bg-white/10" />
            <div className="mt-4 h-4 w-48 animate-pulse rounded bg-white/10" />
            <div className="mt-8 space-y-5">
              <div className="h-12 animate-pulse rounded bg-white/10" />
              <div className="h-12 animate-pulse rounded bg-white/10" />
              <div className="h-12 animate-pulse rounded bg-white/10" />
            </div>
          </div>
        }>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-xs text-white/25">
          Tetrangles Projects Limited — Admin Portal
        </p>
      </div>
    </div>
  );
}
