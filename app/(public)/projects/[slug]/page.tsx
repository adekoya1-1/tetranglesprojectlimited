import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Calendar, User, Tag, CheckCircle2 } from "lucide-react";
import { ImageGallery } from "@/components/public/ImageGallery";
import { ProjectCard } from "@/components/public/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectJsonLd } from "@/components/JsonLd";
import { db } from "@/lib/db";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { ProjectWithImages } from "@/types";

export const revalidate = 60;

const CATEGORY_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  INFRASTRUCTURE: "Infrastructure",
  FACILITY_MANAGEMENT: "Facility Management",
  REAL_ESTATE: "Real Estate",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+2348058358897";

interface PageProps {
  params: { slug: string };
}

async function getProject(slug: string): Promise<ProjectWithImages | null> {
  try {
    const project = await db.project.findUnique({
      where: { slug },
      include: { images: { orderBy: { order: "asc" } } },
    });
    if (!project?.published) return null;
    return project;
  } catch {
    return null;
  }
}

async function getRelated(
  slug: string,
  category: string
): Promise<ProjectWithImages[]> {
  try {
    return await db.project.findMany({
      where: {
        published: true,
        category: category as never,
        NOT: { slug },
      },
      include: { images: { orderBy: { order: "asc" } } },
      take: 3,
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      images: project.images[0]
        ? [{ url: project.images[0].url }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const related = await getRelated(params.slug, project.category);

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tetrangles.com.ng";

  const whatsappUrl = buildWhatsAppUrl(
    WHATSAPP,
    `Hello Tetrangles! I'm interested in starting a similar project to "${project.title}". Can we discuss?`
  );

  const specs = [
    project.client && { icon: User, label: "Client", value: project.client },
    project.location && { icon: MapPin, label: "Location", value: project.location },
    project.year && { icon: Calendar, label: "Year", value: project.year },
    { icon: Tag, label: "Category", value: CATEGORY_LABELS[project.category] ?? project.category },
  ].filter(Boolean) as { icon: typeof User; label: string; value: string }[];

  return (
    <>
      <ProjectJsonLd
        title={project.title}
        description={project.description}
        image={project.images[0]?.url}
        url={`${BASE_URL}/projects/${project.slug}`}
        location={project.location}
        year={project.year}
      />

      {/* ── Page Hero ── */}
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-brand-charcoal pb-16 pt-32">
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
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Projects
          </Link>

          <div>
            <span className="inline-block bg-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              {CATEGORY_LABELS[project.category] ?? project.category}
            </span>
            <h1 className="section-title-light mt-3 max-w-3xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {project.location && (
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <MapPin className="h-4 w-4 text-brand-orange" />
                  {project.location}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1.5 text-sm text-white/50">
                  <Calendar className="h-4 w-4 text-brand-orange" />
                  {project.year}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Gallery — 2 cols */}
            <Reveal direction="left" className="lg:col-span-2">
              <ImageGallery images={project.images} title={project.title} />
            </Reveal>

            {/* Specs sidebar — 1 col */}
            <Reveal direction="right" delay={0.15}>
              {/* Project specs */}
              <div className="border border-brand-gray-mid bg-brand-gray p-7">
                <h2 className="font-condensed text-sm font-bold uppercase tracking-widest text-brand-charcoal">
                  Project Details
                </h2>
                <dl className="mt-5 space-y-4">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-orange/10">
                        <Icon className="h-4 w-4 text-brand-orange" />
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
                          {label}
                        </dt>
                        <dd className="mt-0.5 text-sm font-semibold text-brand-charcoal">
                          {value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex w-full items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start a Similar Project
              </a>

              <Link
                href="/contact"
                className="btn-secondary mt-3 w-full text-center"
              >
                Send an Enquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* Description + Features */}
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <Reveal direction="left" className="lg:col-span-2">
              <h2 className="section-title">Project Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
                {project.description}
              </p>
            </Reveal>

            {project.features.length > 0 && (
              <Reveal direction="right" delay={0.1}>
                <h3 className="font-condensed text-lg font-bold uppercase text-brand-charcoal">
                  Key Features
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-brand-text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Full-Width CTA ── */}
      <section className="bg-brand-orange">
        <div className="container-custom py-14">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h2 className="font-condensed text-3xl font-black uppercase text-white">
                  Like What You See?
                </h2>
                <p className="mt-2 text-base text-white/80">
                  Chat with us on WhatsApp to discuss a similar project for you.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-orange transition-all duration-200 hover:bg-brand-charcoal hover:text-white"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <section className="section-padding bg-brand-gray">
          <div className="container-custom">
            <Reveal>
              <p className="section-label">More Projects</p>
              <h2 className="section-title mt-2">Related Work</h2>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 text-center">
                <Link href="/projects" className="btn-secondary">
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
