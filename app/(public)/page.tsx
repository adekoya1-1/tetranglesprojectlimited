import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroSection } from "@/components/public/HeroSection";
import { StatsSection } from "@/components/public/StatsSection";
import { ServiceCard } from "@/components/public/ServiceCard";
import { ProjectCard } from "@/components/public/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { servicesData } from "@/lib/data/services";
import { buildWhatsAppUrl } from "@/lib/utils";
import { db } from "@/lib/db";
import type { ProjectWithImages } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tetrangles Projects Limited | Citadel Of Contemporary",
  description:
    "Nigeria's premier construction and real estate company. 15+ years delivering luxury residential, commercial, and infrastructure projects across Lagos and West Africa.",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

const whyPoints = [
  "Over 15 years of proven industry experience",
  "End-to-end project delivery from concept to completion",
  "Certified professionals and licensed contractors",
  "Premium-grade materials from vetted suppliers",
  "Client-centric approach with transparent communication",
];

async function getFeaturedProjects(): Promise<ProjectWithImages[]> {
  try {
    // Fetch all featured + published projects, ordered so the admin's
    // preferred pick (lowest `order` value) comes first per category
    const all = await db.project.findMany({
      where: { published: true, featured: true },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    // One project per category — first match wins
    const seen = new Set<string>();
    const picks: ProjectWithImages[] = [];
    for (const project of all) {
      if (!seen.has(project.category)) {
        seen.add(project.category);
        picks.push(project);
      }
    }
    return picks;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    "Hello Tetrangles! I'd like to discuss a project with your team."
  );

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Stats Strip ── */}
      <StatsSection />

      {/* ── Services ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <p className="section-label">What We Do</p>
            <h2 className="section-title mt-2 max-w-2xl">
              End-to-End Construction & Real Estate Solutions
            </h2>
            <p className="mt-4 max-w-xl text-base text-brand-text-muted">
              From concept to completion, we offer five integrated construction
              and real estate services — all under one roof.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 text-center">
              <Link href="/services" className="btn-secondary">
                Explore All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── About Teaser ── */}
      <section className="section-padding bg-brand-charcoal">
        <div className="container-custom">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal direction="left">
              <p className="section-label">About Tetrangles</p>
              <h2 className="section-title-light mt-2">
                Built On Integrity,
                <br />
                <span className="text-brand-orange">Delivered With</span>
                <br />
                Excellence
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                Incorporated in 2014 and founded in 2010, Tetrangles Projects
                Limited has grown into one of Lagos&apos;s most trusted
                construction and real estate companies. We combine technical
                depth with an unwavering commitment to quality on every project
                we undertake.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Our portfolio spans luxury residential homes in Lekki and Ajah,
                commercial complexes, and infrastructure works across
                South-West Nigeria.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Our Story
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/projects" className="btn-outline-white">
                  View Projects
                </Link>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <ul className="space-y-4">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm leading-relaxed text-white/70">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 border-l-4 border-brand-orange pl-6">
                <p className="font-condensed text-3xl font-black text-white">
                  &ldquo;Quality is not an act, it&apos;s a habit.&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/30">
                  — The Tetrangles Standard
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="section-label">Our Work</p>
                <h2 className="section-title mt-2">Featured Projects</h2>
                <p className="mt-3 max-w-lg text-base text-brand-text-muted">
                  A selection of our finest completed projects across residential,
                  commercial, and infrastructure sectors.
                </p>
              </div>
              <Link href="/projects" className="btn-primary shrink-0">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {featuredProjects.length > 0 ? (
            <div
              className={`mt-12 grid grid-cols-1 gap-6 ${
                featuredProjects.length === 1
                  ? "md:grid-cols-1 max-w-lg"
                  : featuredProjects.length === 2
                  ? "md:grid-cols-2"
                  : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {featuredProjects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            /* Fallback when no featured projects are set yet */
            <Reveal>
              <div className="mt-12 flex flex-col items-center justify-center rounded-none border-2 border-dashed border-gray-300 py-20 text-center">
                <p className="font-condensed text-xl font-bold uppercase text-gray-400">
                  No Featured Projects Yet
                </p>
                <p className="mt-2 max-w-sm text-sm text-gray-400">
                  Mark projects as &ldquo;Featured&rdquo; in the admin panel to
                  display them here.
                </p>
                <Link href="/projects" className="btn-secondary mt-6">
                  Browse All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Team Teaser ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-label justify-center">Our People</p>
              <h2 className="section-title mt-2">Led By Experience</h2>
              <p className="mt-4 text-base text-brand-text-muted">
                Our team of certified engineers, architects, project managers,
                and trade specialists brings decades of combined experience to
                every project we undertake.
              </p>
              <Link href="/team" className="btn-secondary mt-8">
                Meet the Team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WhatsApp CTA Strip ── */}
      <section className="bg-brand-charcoal-light">
        <div className="container-custom py-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <p className="section-label">Ready to Build?</p>
                <h2 className="section-title-light mt-2 max-w-lg">
                  Let&apos;s Start Your
                  <span className="text-brand-orange"> Project Today</span>
                </h2>
                <p className="mt-3 max-w-md text-base text-white/50">
                  Chat with our team on WhatsApp for a free consultation —
                  no commitment, just expert advice.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <Link href="/contact" className="btn-outline-white">
                  Send a Message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
