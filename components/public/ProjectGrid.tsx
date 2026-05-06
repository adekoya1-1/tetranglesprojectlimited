"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/public/ProjectCard";
import type { ProjectWithImages } from "@/types";

const CATEGORIES = [
  { value: "ALL", label: "All Projects" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INFRASTRUCTURE", label: "Infrastructure" },
  { value: "FACILITY_MANAGEMENT", label: "Facility Mgmt" },
  { value: "REAL_ESTATE", label: "Real Estate" },
] as const;

interface ProjectGridProps {
  projects: ProjectWithImages[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "ALL" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.location ?? "").toLowerCase().includes(q) ||
        (p.year ?? "").includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveCategory(value)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                activeCategory === value
                  ? "bg-brand-orange text-white"
                  : "bg-white text-brand-text-muted hover:bg-brand-gray hover:text-brand-charcoal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-brand-gray-mid bg-white py-2.5 pl-9 pr-4 text-sm text-brand-charcoal placeholder:text-brand-gray-dark focus:border-brand-orange focus:outline-none"
          />
        </div>
      </div>

      {/* Result count */}
      <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand-text-muted">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "ALL" ? ` — ${CATEGORIES.find((c) => c.value === activeCategory)?.label}` : ""}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-condensed text-2xl font-black uppercase text-brand-charcoal/20">
            No projects found
          </p>
          <p className="mt-2 text-sm text-brand-text-muted">
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
