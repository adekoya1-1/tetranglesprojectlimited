import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";

async function getProjects() {
  return db.project.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      location: true,
      published: true,
      featured: true,
      year: true,
      createdAt: true,
      images: {
        orderBy: { order: "asc" },
        take: 1,
        select: { url: true, publicId: true },
      },
    },
  });
}

export default async function AdminProjectsPage() {
  const raw = await getProjects();

  const projects = raw.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
            Projects
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {projects.length} total · {projects.filter((p) => p.published).length} published
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-brand-orange px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
