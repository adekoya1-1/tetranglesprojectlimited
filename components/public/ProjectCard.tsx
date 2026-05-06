import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import type { ProjectWithImages } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  INFRASTRUCTURE: "Infrastructure",
  FACILITY_MANAGEMENT: "Facility Management",
  REAL_ESTATE: "Real Estate",
};

interface ProjectCardProps {
  project: ProjectWithImages;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryImage = project.images.find((img) => img.isPrimary) ?? project.images[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-brand-charcoal-light md:h-64">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Brand placeholder */
          <div className="flex h-full items-center justify-center">
            <div className="flex gap-1 opacity-20">
              <span className="block h-20 w-4 bg-brand-orange" />
              <span className="block h-20 w-4 bg-brand-orange opacity-65" />
              <span className="block h-20 w-4 bg-brand-orange opacity-30" />
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-charcoal/0 transition-colors duration-300 group-hover:bg-brand-charcoal/40" />

        {/* View project CTA on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 bg-brand-orange px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
            View Project
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span className="bg-brand-orange px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            {CATEGORY_LABELS[project.category] ?? project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute right-4 top-4">
            <span className="bg-brand-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-condensed text-xl font-bold uppercase text-brand-charcoal transition-colors duration-200 group-hover:text-brand-orange">
          {project.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {project.location && (
            <span className="flex items-center gap-1.5 text-xs text-brand-text-muted">
              <MapPin className="h-3.5 w-3.5 text-brand-orange" />
              {project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-1.5 text-xs text-brand-text-muted">
              <Calendar className="h-3.5 w-3.5 text-brand-orange" />
              {project.year}
            </span>
          )}
        </div>

        {project.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-text-muted">
            {project.description}
          </p>
        )}
      </div>
    </Link>
  );
}
