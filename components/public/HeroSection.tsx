"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

export function HeroSection() {
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    "Hello Tetrangles! I'd like a free consultation for my project."
  );

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-charcoal">
      {/* Geometric background elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Large diagonal stripe top-right */}
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rotate-12 border border-white/5" />
        <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rotate-12 border border-white/5" />
        {/* Orange accent block bottom-left */}
        <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-brand-orange" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Orange glow top-right */}
        <div className="absolute right-0 top-0 h-[40vh] w-[40vw] bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex gap-0.5">
              <span className="block h-4 w-1 bg-brand-orange" />
              <span className="block h-4 w-1 bg-brand-orange opacity-65" />
              <span className="block h-4 w-1 bg-brand-orange opacity-30" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Since 2010 &bull; Lagos, Nigeria
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-condensed text-[clamp(3.5rem,10vw,7rem)] font-black uppercase leading-[0.92] tracking-tight text-white"
          >
            Citadel Of
            <br />
            <span className="text-brand-orange">Contemporary</span>
            <br />
            Excellence
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            Nigeria&apos;s premier construction and real estate company. We
            design, build, and manage exceptional projects across Lagos and
            West Africa — with precision, integrity, and excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/projects" className="btn-primary group">
              View Our Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn-outline-white">
              Get a Free Quote
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-10"
          >
            {[
              { value: "15+", label: "Years Experience" },
              { value: "50+", label: "Projects Delivered" },
              { value: "5", label: "Core Services" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-condensed text-3xl font-black text-brand-orange">
                  {value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-white/20" />
        </motion.div>
      </motion.div>

      {/* Right-side decorative panel (desktop) */}
      <div
        aria-hidden
        className="absolute right-0 top-0 hidden h-full w-[35%] lg:block"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="flex h-full flex-col items-center justify-center gap-8 pr-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center bg-[#25D366] shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 fill-white"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              WhatsApp Us
            </span>
          </a>

          <div className="h-24 w-px bg-gradient-to-b from-white/10 to-transparent" />

          <a
            href="tel:+2348058358897"
            className="[writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 transition-colors hover:text-white/50"
          >
            +234 805 835 8897
          </a>
        </div>
      </div>
    </section>
  );
}
