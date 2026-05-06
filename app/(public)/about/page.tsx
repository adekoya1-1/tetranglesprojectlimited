import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Target, Zap, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Tetrangles Projects Limited — Nigeria's premier construction and real estate company, delivering excellence since 2010.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We do what we say, every time. Our word is our bond — with clients, partners, and our team.",
  },
  {
    icon: Target,
    title: "Excellence",
    desc: "We settle for nothing less than the best in every project, every material, every detail.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "We embrace new construction methods, technologies, and best practices to deliver superior results.",
  },
  {
    icon: Users,
    title: "Teamwork",
    desc: "We believe the best outcomes are achieved through collaboration — internally and with our clients.",
  },
];

const timeline = [
  { year: "2010", event: "Tetrangles founded by industry veterans in Lagos" },
  { year: "2014", event: "Officially incorporated as Tetrangles Projects Limited" },
  { year: "2018", event: "Expanded into facility management and consultancy services" },
  { year: "2022", event: "Portfolio exceeds 40 completed projects across Lagos" },
  { year: "2024", event: "50+ projects delivered; recognised as a premier construction brand" },
];

const whyPoints = [
  {
    number: "01",
    title: "15+ Years Experience",
    desc: "Deep industry expertise accumulated across hundreds of projects in residential, commercial, and infrastructure sectors.",
  },
  {
    number: "02",
    title: "End-to-End Delivery",
    desc: "From concept design to handover, we manage every phase of your project under one accountable team.",
  },
  {
    number: "03",
    title: "Certified Professionals",
    desc: "Our team holds qualifications from CORBON, QSRBN, and other Nigerian regulatory bodies.",
  },
  {
    number: "04",
    title: "Premium Standards",
    desc: "We specify and source only quality materials from vetted suppliers, never compromising on specifications.",
  },
  {
    number: "05",
    title: "Client-Centric",
    desc: "Transparent reporting, open communication, and a genuine commitment to your satisfaction — always.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
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
          <p className="section-label">About Us</p>
          <h1 className="section-title-light mt-2 max-w-2xl">
            Who We Are
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/50">
            A legacy of excellence in construction and real estate since 2010.
          </p>
        </div>
      </section>

      {/* ── Company Story ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <Reveal direction="left">
              <p className="section-label">Our Story</p>
              <h2 className="section-title mt-2">
                A Decade of Building
                <span className="text-brand-orange"> Nigeria</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-brand-text-muted">
                Tetrangles Projects Limited is a dynamic, indigenous construction
                and real estate company founded in 2010 and incorporated in Nigeria
                in 2014. Over the past 15 years, we have established ourselves as
                one of Lagos&apos;s most trusted names in building, construction,
                project management, and facility management.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
                Our portfolio spans luxury residential homes in Lekki and Ajah,
                commercial complexes on Lagos Island, and infrastructure projects
                across South-West Nigeria. We combine technical expertise with an
                unwavering commitment to quality, safety, and client satisfaction —
                the values that have driven our growth from a small team to a
                full-service construction enterprise.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
                Today, Tetrangles is more than a contractor — we are a strategic
                partner for developers, investors, and individuals who want to build
                something that lasts.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2010", label: "Year Founded" },
                  { value: "2014", label: "Year Incorporated" },
                  { value: "50+", label: "Projects Completed" },
                  { value: "Lagos", label: "Headquarters" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="border border-brand-gray-mid p-6"
                  >
                    <p className="font-condensed text-3xl font-black text-brand-orange">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Address block */}
              <div className="mt-4 border-l-4 border-brand-orange bg-brand-gray p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                  Headquarters
                </p>
                <p className="mt-2 text-sm font-semibold text-brand-charcoal">
                  8A, Road 26, Ikota Villa Estate
                  <br />
                  Lagos, Nigeria
                </p>
                <p className="mt-3 text-xs text-brand-text-muted">
                  RC No. Incorporated 2014 under CAMA
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">Our Purpose</p>
            <h2 className="section-title-light mt-2">Vision &amp; Mission</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-white/5 p-10">
                <div className="mb-6 flex gap-0.5">
                  <span className="block h-8 w-1.5 bg-brand-orange" />
                  <span className="block h-8 w-1.5 bg-brand-orange opacity-65" />
                  <span className="block h-8 w-1.5 bg-brand-orange opacity-30" />
                </div>
                <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
                  Our Vision
                </h3>
                <p className="mt-4 font-condensed text-2xl font-black uppercase leading-tight text-white">
                  To be Africa&apos;s most respected construction and real estate
                  company, delivering world-class projects that stand the test of
                  time.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border border-white/10 bg-white/5 p-10">
                <div className="mb-6 flex gap-0.5">
                  <span className="block h-8 w-1.5 bg-brand-orange" />
                  <span className="block h-8 w-1.5 bg-brand-orange opacity-65" />
                  <span className="block h-8 w-1.5 bg-brand-orange opacity-30" />
                </div>
                <h3 className="font-condensed text-sm font-bold uppercase tracking-[0.2em] text-brand-orange">
                  Our Mission
                </h3>
                <p className="mt-4 font-condensed text-2xl font-black uppercase leading-tight text-white">
                  To provide innovative, high-quality construction and real estate
                  solutions that exceed client expectations while upholding the
                  highest standards of integrity, safety, and professionalism.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">What Drives Us</p>
            <h2 className="section-title mt-2">Core Values</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group border border-brand-gray-mid p-8 transition-all duration-300 hover:border-brand-orange hover:shadow-card">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center bg-brand-orange/10 transition-colors duration-300 group-hover:bg-brand-orange">
                    <Icon className="h-6 w-6 text-brand-orange transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="font-condensed text-xl font-black uppercase text-brand-charcoal">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-text-muted">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">Our Journey</p>
            <h2 className="section-title mt-2">Company Timeline</h2>
          </Reveal>

          <div className="relative mt-14">
            {/* Vertical line */}
            <div className="absolute left-[3.5rem] top-0 h-full w-px bg-brand-gray-mid md:left-1/2" />

            <div className="space-y-10">
              {timeline.map(({ year, event }, i) => (
                <Reveal key={year} delay={i * 0.1}>
                  <div
                    className={`relative flex items-start gap-8 md:items-center ${
                      i % 2 === 0
                        ? "md:flex-row"
                        : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Year pill */}
                    <div
                      className={`relative z-10 shrink-0 ${
                        i % 2 === 0
                          ? "md:order-2 md:text-left"
                          : "md:order-2 md:text-right"
                      }`}
                    >
                      <span className="inline-block bg-brand-orange px-4 py-2 font-condensed text-lg font-black text-white">
                        {year}
                      </span>
                    </div>

                    {/* Dot on line */}
                    <div className="absolute left-[3.5rem] top-3 z-20 h-3 w-3 -translate-x-1/2 bg-brand-charcoal md:left-1/2 md:top-auto" />

                    {/* Event text */}
                    <div
                      className={`ml-16 flex-1 md:ml-0 md:max-w-[calc(50%-4rem)] ${
                        i % 2 === 0 ? "md:text-right" : "md:text-left md:order-3"
                      }`}
                    >
                      <p className="text-sm leading-relaxed text-brand-text-muted">
                        {event}
                      </p>
                    </div>
                    {/* Spacer for alternating layout */}
                    <div className="hidden flex-1 md:block md:max-w-[calc(50%-4rem)]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">Why Tetrangles</p>
            <h2 className="section-title mt-2 max-w-xl">
              Five Reasons Clients Choose Us
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map(({ number, title, desc }, i) => (
              <Reveal key={number} delay={i * 0.08}>
                <div className="flex gap-5">
                  <span className="font-condensed text-5xl font-black leading-none text-brand-orange/20">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-condensed text-xl font-black uppercase text-brand-charcoal">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EHS Policy ── */}
      <section className="bg-brand-orange">
        <div className="container-custom py-14">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                Health, Safety &amp; Environment
              </p>
              <h2 className="mt-3 font-condensed text-3xl font-black uppercase text-white md:text-4xl">
                Our EHS Commitment
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                We are committed to maintaining a safe, healthy, and
                environmentally responsible workplace on every site we operate.
                All projects are managed in accordance with our comprehensive EHS
                policy and applicable Nigerian regulatory requirements. Zero
                harm to people and the environment is non-negotiable.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                {["Zero Harm Target", "EHS Trained Workforce", "Compliant with Regulations", "Regular Site Audits"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                      <span className="text-sm font-semibold text-white">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-title-light">
                Ready to Work
                <span className="text-brand-orange"> With Us?</span>
              </h2>
              <p className="mt-4 text-base text-white/50">
                Whether you have a project in mind or just want to explore
                your options, our team is here to help.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Start a Conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/projects" className="btn-outline-white">
                  View Our Work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
