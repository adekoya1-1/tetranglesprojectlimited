"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, EyeOff, Star, Loader2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  published: boolean;
  featured: boolean;
  images: { url: string; publicId: string }[];
  year: string | null;
  createdAt: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

const categoryColors: Record<string, string> = {
  RESIDENTIAL: "bg-blue-100 text-blue-700",
  COMMERCIAL: "bg-purple-100 text-purple-700",
  INFRASTRUCTURE: "bg-green-100 text-green-700",
  FACILITY_MANAGEMENT: "bg-amber-100 text-amber-700",
  REAL_ESTATE: "bg-pink-100 text-pink-700",
};

export function ProjectsTable({ projects: initial }: ProjectsTableProps) {
  const router = useRouter();
  const [projects, setProjects] = useState(initial);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("ALL");

  const filtered = projects.filter((p) => {
    const matchCat = filterCat === "ALL" || p.category === filterCat;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.location ?? "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const togglePublish = async (project: Project) => {
    setLoadingId(project.id);
    try {
      const res = await fetch(`/api/projects/${project.id}/publish`, {
        method: "PATCH",
      });
      if (res.ok) {
        const data = await res.json();
        setProjects((ps) =>
          ps.map((p) =>
            p.id === project.id ? { ...p, published: data.data.published } : p
          )
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((ps) => ps.filter((p) => p.id !== id));
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="RESIDENTIAL">Residential</option>
          <option value="COMMERCIAL">Commercial</option>
          <option value="INFRASTRUCTURE">Infrastructure</option>
          <option value="FACILITY_MANAGEMENT">Facility Management</option>
          <option value="REAL_ESTATE">Real Estate</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Project
              </th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:table-cell">
                Category
              </th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:table-cell">
                Year
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Visible
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                  No projects found
                </td>
              </tr>
            )}
            {filtered.map((project) => (
              <tr key={project.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <div className="relative h-10 w-14 shrink-0 overflow-hidden bg-gray-100">
                      {project.images[0] ? (
                        <Image
                          src={project.images[0].url}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300 text-[10px]">
                          No img
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-brand-charcoal">
                        {project.title}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        {project.location}
                        {project.year ? ` · ${project.year}` : ""}
                      </p>
                    </div>
                    {project.featured && (
                      <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                      categoryColors[project.category] ?? "bg-gray-100 text-gray-600"
                    )}
                  >
                    {project.category.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-gray-500 lg:table-cell">
                  {project.year ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => togglePublish(project)}
                    disabled={loadingId === project.id}
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                    title={project.published ? "Click to unpublish" : "Click to publish"}
                  >
                    {loadingId === project.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    ) : project.published ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span
                      className={
                        project.published ? "text-green-600" : "text-gray-400"
                      }
                    >
                      {project.published ? "Live" : "Draft"}
                    </span>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-brand-charcoal"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {project.published && (
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-green-600"
                        title="View on site"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => deleteProject(project.id)}
                      disabled={loadingId === project.id}
                      className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-gray-400">
        {filtered.length} of {projects.length} projects
      </p>
    </div>
  );
}
