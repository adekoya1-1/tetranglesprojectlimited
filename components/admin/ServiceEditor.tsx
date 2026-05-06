"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDesc: string | null;
}

interface ServiceEditorProps {
  services: Service[];
}

export function ServiceEditor({ services: initial }: ServiceEditorProps) {
  const router = useRouter();
  const [services, setServices] = useState(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    longDesc: "",
  });

  const openEdit = (s: Service) => {
    setForm({
      title: s.title,
      description: s.description,
      longDesc: s.longDesc ?? "",
    });
    setEditId(s.id);
    setError(null);
  };

  const closeEdit = () => {
    setEditId(null);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/services/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          longDesc: form.longDesc || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save");
      }

      const data = await res.json();
      setServices((ss) => ss.map((s) => (s.id === editId ? data.data : s)));
      closeEdit();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-brand-charcoal placeholder-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div key={service.id} className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
          {editId === service.id ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-condensed text-base font-bold uppercase text-brand-charcoal">
                  Editing: {service.title}
                </h3>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="text-gray-400 hover:text-brand-charcoal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {error && (
                <p className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {error}
                </p>
              )}

              <div>
                <label className={labelClass}>Name *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Short Description *</label>
                <input
                  type="text"
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="One-line summary shown in cards"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Full Description</label>
                <textarea
                  rows={6}
                  value={form.longDesc}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, longDesc: e.target.value }))
                  }
                  className={cn(inputClass, "resize-y")}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-brand-orange px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-5 py-2.5 border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-condensed text-lg font-bold uppercase text-brand-charcoal">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{service.description}</p>
                {service.longDesc && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-400">
                    {service.longDesc}
                  </p>
                )}
              </div>
              <button
                onClick={() => openEdit(service)}
                className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-brand-charcoal"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
