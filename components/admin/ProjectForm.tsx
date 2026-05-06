"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "INFRASTRUCTURE",
  "FACILITY_MANAGEMENT",
  "REAL_ESTATE",
] as const;

interface ProjectImage {
  url: string;
  publicId: string;
}

interface ProjectFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string | null;
    client: string | null;
    year: string | null;
    featured: boolean;
    published: boolean;
    images: ProjectImage[];
    features: string[];
  };
}

export function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState<string>(initialData?.category ?? "RESIDENTIAL");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [client, setClient] = useState(initialData?.client ?? "");
  const [year, setYear] = useState(initialData?.year ?? "");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [images, setImages] = useState<ProjectImage[]>(initialData?.images ?? []);
  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.length ? initialData.features : [""]
  );

  const addFeature = () => setFeatures((f) => [...f, ""]);
  const updateFeature = (i: number, val: string) =>
    setFeatures((f) => f.map((x, idx) => (idx === i ? val : x)));
  const removeFeature = (i: number) =>
    setFeatures((f) => f.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      description,
      category,
      location: location || undefined,
      client: client || undefined,
      year: year || undefined,
      featured,
      published,
      images,
      features: features.filter(Boolean),
    };

    try {
      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/projects/${initialData!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-brand-charcoal placeholder-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column — main fields */}
        <div className="space-y-6 lg:col-span-2">
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Project Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lekki Phase 2 Residential Estate"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description *</label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project scope, outcomes, and highlights…"
                  className={cn(inputClass, "resize-y")}
                />
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Lagos, Nigeria"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Year Completed</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2024"
                    maxLength={10}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Client / Owner</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Client name (optional)"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Key Features
            </h2>
            <div className="space-y-2">
              {features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    placeholder={`Feature ${i + 1}`}
                    className={cn(inputClass, "flex-1")}
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:underline"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Feature
            </button>
          </div>

          {/* Images */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Images
            </h2>
            <ImageUploader value={images} onChange={setImages} maxImages={10} />
          </div>
        </div>

        {/* Right column — meta */}
        <div className="space-y-6">
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Visibility
            </h2>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="h-4 w-4 accent-brand-orange"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">
                    Published
                  </p>
                  <p className="text-xs text-gray-400">
                    Visible on the public website
                  </p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 accent-brand-orange"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal">
                    Featured
                  </p>
                  <p className="text-xs text-gray-400">
                    Shown on homepage and top of portfolio
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="sticky top-24 space-y-3">
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving
                ? "Saving…"
                : mode === "create"
                ? "Create Project"
                : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
