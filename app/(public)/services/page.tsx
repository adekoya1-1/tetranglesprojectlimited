import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceCard } from "@/components/public/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { servicesData } from "@/lib/data/services";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Tetrangles Projects Limited offers five integrated construction and real estate services: Construction, Project Management, Architecture, Consultancy, and Facility Management.",
};

const processSteps = [
  { step: "01", title: "Enquiry", desc: "Reach out via our contact form or WhatsApp." },
  { step: "02", title: "Consultation", desc: "Free briefing session with our project team." },
  { step: "03", title: "Proposal", desc: "We prepare a detailed scope and cost estimate." },
  { step: "04", title: "Agreement", desc: "Contract signing and project kick-off." },
  { step: "05", title: "Delivery", desc: "Execution, quality control, and handover." },
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

export default function ServicesPage() {
  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    "Hello Tetrangles! I'd like to discuss your services."
  );

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-brand-orange" />
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
          <p className="section-label">What We Offer</p>
          <h1 className="section-title-light mt-2 max-w-2xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/50">
            Five integrated services delivering end-to-end construction and
            real estate solutions across Nigeria.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">Core Services</p>
            <h2 className="section-title mt-2">
              End-to-End Building Solutions
            </h2>
            <p className="mt-4 max-w-xl text-base text-brand-text-muted">
              From concept to completion, our five service lines work
              seamlessly together — or independently — to meet your specific
              project needs.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">How It Works</p>
            <h2 className="section-title-light mt-2">Our Process</h2>
            <p className="mt-4 max-w-xl text-base text-white/50">
              From first contact to project handover, here&apos;s what working
              with Tetrangles looks like.
            </p>
          </Reveal>

          <div className="relative mt-14">
            {/* Connector line */}
            <div className="absolute left-[2.25rem] top-0 h-full w-px bg-white/10 md:hidden" />
            <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-px bg-white/10" />

            <div className="grid gap-0 md:grid-cols-5">
              {processSteps.map(({ step, title, desc }, i) => (
                <Reveal key={step} delay={i * 0.1} className="relative">
                  <div className="flex gap-6 pb-10 md:flex-col md:items-center md:gap-4 md:pb-0 md:pt-0 md:text-center">
                    {/* Step circle */}
                    <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center bg-brand-orange font-condensed text-lg font-black text-white">
                      {step}
                    </div>
                    <div>
                      <h3 className="font-condensed text-lg font-bold uppercase text-white">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal direction="left">
              <p className="section-label">Our Commitment</p>
              <h2 className="section-title mt-2">
                Quality in
                <span className="text-brand-orange"> Every Detail</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
                Every service we provide is underpinned by the same core
                principles that have driven our reputation for 15 years.
              </p>
              <Link href="/about" className="btn-secondary mt-8">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <ul className="space-y-5">
                {[
                  "Certified engineers and licensed contractors on every project",
                  "Strict quality control at every milestone",
                  "Transparent progress reporting to clients",
                  "Health, safety & environment compliance as standard",
                  "Post-handover support and defects liability management",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-brand-text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-orange">
        <div className="container-custom py-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h2 className="font-condensed text-3xl font-black uppercase text-white md:text-4xl">
                  Ready to Discuss Your Project?
                </h2>
                <p className="mt-2 text-base text-white/80">
                  Get a free consultation with our team — no obligation.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-orange transition-all duration-200 hover:bg-brand-charcoal hover:text-white"
                >
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-brand-orange"
                >
                  Send an Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
