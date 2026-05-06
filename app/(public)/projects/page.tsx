import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/public/ProjectGrid";
import { db } from "@/lib/db";
import type { ProjectWithImages } from "@/types";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Browse Tetrangles Projects Limited's portfolio of completed residential, commercial, and infrastructure projects across Lagos and Nigeria.",
};

export const revalidate = 60;

async function getProjects(): Promise<ProjectWithImages[]> {
  try {
    return await db.project.findMany({
      where: { published: true },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

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
          <div className="absolute right-0 top-0 h-[40vh] w-[30vw] bg-brand-orange/5 blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <Reveal>
            <p className="section-label">Our Work</p>
            <h1 className="section-title-light mt-2">Project Portfolio</h1>
            <p className="mt-4 max-w-xl text-lg text-white/50">
              {projects.length > 0
                ? `${projects.length} completed projects across residential, commercial, and infrastructure sectors.`
                : "A showcase of our completed projects across Lagos and Nigeria."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="section-padding bg-brand-gray">
        <div className="container-custom">
          {projects.length === 0 ? (
            <Reveal>
              <div className="py-24 text-center">
                <p className="font-condensed text-3xl font-black uppercase text-brand-charcoal/30">
                  Projects coming soon
                </p>
                <p className="mt-3 text-sm text-brand-text-muted">
                  Run <code className="rounded bg-brand-gray-mid px-2 py-0.5 font-mono text-xs">npm run db:seed</code> to populate the portfolio.
                </p>
              </div>
            </Reveal>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>
      </section>
    </>
  );
}
