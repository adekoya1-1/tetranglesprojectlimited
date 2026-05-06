import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface Props {
  params: { id: string };
}

async function getProject(id: string) {
  return db.project.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      category: true,
      location: true,
      client: true,
      year: true,
      featured: true,
      published: true,
      features: true,
      images: {
        orderBy: { order: "asc" },
        select: { url: true, publicId: true },
      },
    },
  });
}

export default async function EditProjectPage({ params }: Props) {
  const project = await getProject(params.id);
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
            Edit Project
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">{project.title}</p>
        </div>
        {project.published && (
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:border-green-400 hover:text-green-600"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View on Site
          </Link>
        )}
      </div>
      <ProjectForm
        mode="edit"
        initialData={{
          ...project,
          features: project.features as string[],
        }}
      />
    </div>
  );
}
