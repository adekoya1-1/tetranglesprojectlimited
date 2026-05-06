"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Settings {
  whatsappNumber: string;
  phone2: string | null;
  email: string;
  address: string;
  instagram: string | null;
  facebook: string | null;
}

interface SettingsFormProps {
  initialData: Settings | null;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [form, setForm] = useState<Settings>({
    whatsappNumber: initialData?.whatsappNumber ?? "",
    phone2: initialData?.phone2 ?? "",
    email: initialData?.email ?? "",
    address: initialData?.address ?? "",
    instagram: initialData?.instagram ?? "",
    facebook: initialData?.facebook ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof Settings, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const payload = {
      whatsappNumber: form.whatsappNumber,
      phone2: form.phone2 || null,
      email: form.email,
      address: form.address,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save settings");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Contact */}
      <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
          Contact Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>WhatsApp Number *</label>
            <input
              type="tel"
              required
              value={form.whatsappNumber}
              onChange={(e) => update("whatsappNumber", e.target.value)}
              placeholder="+2348012345678"
              className={inputClass}
            />
            <p className="mt-1 text-[11px] text-gray-400">
              Include country code. This powers all WhatsApp CTAs on the site.
            </p>
          </div>
          <div>
            <label className={labelClass}>Second Phone (optional)</label>
            <input
              type="tel"
              value={form.phone2 ?? ""}
              onChange={(e) => update("phone2", e.target.value)}
              placeholder="+2349012345678"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="info@tetrangles.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Office Address *</label>
            <textarea
              required
              rows={3}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Full office address"
              className={cn(inputClass, "resize-none")}
            />
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h2 className="mb-5 font-condensed text-base font-bold uppercase text-brand-charcoal">
          Social Media
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              type="url"
              value={form.instagram ?? ""}
              onChange={(e) => update("instagram", e.target.value)}
              placeholder="https://instagram.com/tetrangles"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              type="url"
              value={form.facebook ?? ""}
              onChange={(e) => update("facebook", e.target.value)}
              placeholder="https://facebook.com/tetrangles"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className={cn(
          "flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all",
          saved
            ? "bg-green-500"
            : "bg-brand-orange hover:opacity-90",
          "disabled:opacity-60"
        )}
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {saved && <Check className="h-4 w-4" />}
        {saving ? "Saving…" : saved ? "Saved!" : "Save Settings"}
      </button>
    </form>
  );
}
