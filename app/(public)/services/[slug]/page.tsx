import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  ClipboardList,
  Compass,
  Lightbulb,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { FC } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/public/ServiceCard";
import { servicesData, getServiceBySlug } from "@/lib/data/services";
import type { ServiceData } from "@/lib/data/services";
import { buildWhatsAppUrl } from "@/lib/utils";

const iconMap: Record<ServiceData["iconName"], FC<LucideProps>> = {
  Building2,
  ClipboardList,
  Compass,
  Lightbulb,
  Wrench,
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = iconMap[service.iconName];
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    `Hello Tetrangles! I'm interested in your ${service.title} service. I'd like to discuss my project.`
  );

  const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 2);

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-0 h-1 w-1/4 bg-brand-orange" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Services
          </Link>

          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-brand-orange">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="section-label">Our Services</p>
              <h1 className="section-title-light mt-1">{service.title}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-start gap-16 lg:grid-cols-3">
            {/* Description */}
            <Reveal direction="left" className="lg:col-span-2">
              <p className="section-label">Service Overview</p>
              <h2 className="section-title mt-2">What We Do</h2>
              <p className="mt-6 text-base leading-relaxed text-brand-text-muted">
                {service.longDesc}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Enquire via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/contact" className="btn-secondary">
                  Send an Enquiry
                </Link>
              </div>
            </Reveal>

            {/* Features sidebar */}
            <Reveal direction="right" delay={0.15}>
              <div className="bg-brand-gray p-8">
                <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-charcoal">
                  What&apos;s Included
                </h3>
                <ul className="mt-6 space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-brand-text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-brand-gray-mid pt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                    Get a Free Quote
                  </p>
                  <p className="mt-2 text-xs text-brand-text-muted">
                    Contact us today to discuss your requirements and receive a
                    no-obligation estimate.
                  </p>
                  <Link href="/contact" className="btn-primary mt-4 w-full text-xs">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">How It Works</p>
            <h2 className="section-title-light mt-2">Our Process</h2>
            <p className="mt-4 max-w-xl text-base text-white/50">
              A structured approach that ensures quality, transparency, and
              on-time delivery at every stage.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.process.map(({ step, title, desc }, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <div className="border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:border-brand-orange/50">
                  <span className="font-condensed text-5xl font-black leading-none text-brand-orange/30">
                    {step}
                  </span>
                  <h3 className="mt-3 font-condensed text-xl font-bold uppercase text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <section className="bg-brand-orange">
        <div className="container-custom py-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h2 className="font-condensed text-3xl font-black uppercase text-white">
                  Ready to Start a {service.title} Project?
                </h2>
                <p className="mt-2 text-base text-white/80">
                  Message us directly on WhatsApp for a fast, no-obligation
                  consultation.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-orange transition-all duration-200 hover:bg-brand-charcoal hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">Explore More</p>
            <h2 className="section-title mt-2">Related Services</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <ServiceCard service={s} variant="compact" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <Link href="/services" className="btn-secondary">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
