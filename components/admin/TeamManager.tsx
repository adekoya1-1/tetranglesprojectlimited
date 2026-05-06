"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Check, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUploader } from "./ImageUploader";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  publicId: string | null;
  isActive: boolean;
  order: number;
}

interface TeamManagerProps {
  members: TeamMember[];
}

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  isActive: true,
  images: [] as { url: string; publicId: string }[],
};

export function TeamManager({ members: initial }: TeamManagerProps) {
  const router = useRouter();
  const [members, setMembers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (m: TeamMember) => {
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      isActive: m.isActive,
      images: m.imageUrl && m.publicId
        ? [{ url: m.imageUrl, publicId: m.publicId }]
        : [],
    });
    setEditId(m.id);
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio || null,
      isActive: form.isActive,
      imageUrl: form.images[0]?.url ?? null,
      publicId: form.images[0]?.publicId ?? null,
    };

    try {
      if (editId) {
        const res = await fetch(`/api/team/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update member");
        const data = await res.json();
        setMembers((ms) =>
          ms.map((m) => (m.id === editId ? data.data : m))
        );
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create member");
        const data = await res.json();
        setMembers((ms) => [...ms, data.data]);
      }
      closeForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((ms) => ms.filter((m) => m.id !== id));
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  const inputClass =
    "w-full border border-gray-300 bg-white px-3 py-2 text-sm text-brand-charcoal placeholder-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {members.filter((m) => m.isActive).length} active members
        </p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-orange px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="font-condensed text-lg font-bold uppercase text-brand-charcoal">
                {editId ? "Edit Member" : "Add Team Member"}
              </h2>
              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-brand-charcoal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
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
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Role / Title *</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="e.g. Senior Project Manager"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Short professional bio…"
                  className={cn(inputClass, "resize-none")}
                />
              </div>
              <div>
                <label className={labelClass}>Photo</label>
                <ImageUploader
                  value={form.images}
                  onChange={(imgs) => setForm((f) => ({ ...f, images: imgs }))}
                  maxImages={1}
                />
              </div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="h-4 w-4 accent-brand-orange"
                />
                <span className="text-sm text-gray-600">Active (visible on website)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 bg-brand-orange py-2.5 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving…" : editId ? "Save Changes" : "Add Member"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className={cn(
              "bg-white p-5 shadow-sm ring-1 ring-gray-200",
              !member.isActive && "opacity-50"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-gray-100">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xl font-black text-gray-300">
                    {member.name[0]}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-brand-charcoal">
                  {member.name}
                </p>
                <p className="truncate text-xs text-brand-orange">{member.role}</p>
                {!member.isActive && (
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">
                    Inactive
                  </span>
                )}
              </div>
            </div>
            {member.bio && (
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
                {member.bio}
              </p>
            )}
            <div className="mt-4 flex items-center gap-2 border-t border-gray-50 pt-3">
              <button
                onClick={() => openEdit(member)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-brand-charcoal"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                onClick={() => deleteMember(member.id)}
                disabled={loadingId === member.id}
                className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-red-500"
              >
                {loadingId === member.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="py-12 text-center text-sm text-gray-400">
          No team members yet. Add your first team member.
        </div>
      )}
    </div>
  );
}
