"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Loader2,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

type InquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS: InquiryStatus[] = [
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "CONVERTED",
  "CLOSED",
];

const STATUS_LABELS: Record<InquiryStatus, string> = {
  NEW: "New",
  IN_REVIEW: "In Review",
  CONTACTED: "Contacted",
  CONVERTED: "Converted",
  CLOSED: "Closed",
};

export function InquiryDetail({ inquiry: initial }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [inquiry, setInquiry] = useState(initial);
  const [notes, setNotes] = useState(initial.adminNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);

  const updateStatus = async (status: InquiryStatus) => {
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiry((prev) => ({ ...prev, status: data.data.status }));
      }
    } finally {
      setStatusSaving(false);
    }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const whatsappUrl = inquiry.phone
    ? buildWhatsAppUrl(
        inquiry.phone,
        `Hello ${inquiry.name}, thank you for your inquiry regarding ${inquiry.service ?? "our services"}. We'd love to discuss your project further.`
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/inquiries"
            className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-brand-charcoal"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Inquiries
          </Link>
          <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
            {inquiry.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Submitted {formatDate(inquiry.createdAt)}
          </p>
        </div>
        <StatusBadge status={inquiry.status} className="mt-1 shrink-0" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — message + notes */}
        <div className="space-y-6 lg:col-span-2">
          {/* Message */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Message
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
              {inquiry.message}
            </p>
          </div>

          {/* Admin Notes */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Admin Notes
            </h2>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes about this inquiry…"
              className="w-full resize-y border border-gray-300 px-3 py-2 text-sm text-brand-charcoal placeholder-gray-400 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
            />
            <button
              onClick={saveNotes}
              disabled={saving}
              className="mt-3 flex items-center gap-2 bg-brand-charcoal px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-80 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save Notes"}
            </button>
          </div>
        </div>

        {/* Right — contact + status */}
        <div className="space-y-6">
          {/* Contact info */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Contact Info
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-sm text-brand-orange hover:underline break-all"
                >
                  {inquiry.email}
                </a>
              </div>
              {inquiry.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-sm text-brand-charcoal"
                  >
                    {inquiry.phone}
                  </a>
                </div>
              )}
              {inquiry.service && (
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-brand-charcoal">
                    {inquiry.service}
                  </span>
                </div>
              )}
              {inquiry.budget && (
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span className="text-sm text-brand-charcoal">
                    {inquiry.budget}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <span className="text-xs text-gray-400">
                  {formatDate(inquiry.createdAt)}
                </span>
              </div>
            </div>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 bg-green-500 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                <MessageSquare className="h-4 w-4" />
                Reply via WhatsApp
              </a>
            )}
          </div>

          {/* Status workflow */}
          <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-4 font-condensed text-base font-bold uppercase text-brand-charcoal">
              Update Status
            </h2>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={statusSaving || inquiry.status === s}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-sm font-semibold transition-colors",
                    inquiry.status === s
                      ? "bg-brand-orange text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  )}
                >
                  {STATUS_LABELS[s]}
                  {statusSaving && inquiry.status !== s && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
