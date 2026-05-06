"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ChevronRight, Loader2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils";

type InquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "CONVERTED" | "CLOSED";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  status: InquiryStatus;
  createdAt: string;
}

interface InquiryTableProps {
  inquiries: Inquiry[];
}

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "ALL" },
  { label: "New", value: "NEW" },
  { label: "In Review", value: "IN_REVIEW" },
  { label: "Contacted", value: "CONTACTED" },
  { label: "Converted", value: "CONVERTED" },
  { label: "Closed", value: "CLOSED" },
];

export function InquiryTable({ inquiries: initial }: InquiryTableProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState(initial);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchStatus = filterStatus === "ALL" || inq.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.service ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((is) => is.filter((i) => i.id !== id));
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
          placeholder="Search by name, email, or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
        />
        <div className="flex gap-1 overflow-x-auto">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilterStatus(value)}
              className={`shrink-0 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                filterStatus === value
                  ? "bg-brand-charcoal text-white"
                  : "bg-white text-gray-500 ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-sm ring-1 ring-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Contact
              </th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:table-cell">
                Service
              </th>
              <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
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
                  No inquiries found
                </td>
              </tr>
            )}
            {filtered.map((inq) => (
              <tr key={inq.id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-brand-charcoal">{inq.name}</p>
                  <p className="text-xs text-gray-400">{inq.email}</p>
                  {inq.phone && (
                    <p className="text-xs text-gray-400">{inq.phone}</p>
                  )}
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <p className="text-xs text-gray-600">{inq.service ?? "—"}</p>
                  {inq.budget && (
                    <p className="text-xs text-gray-400">{inq.budget}</p>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-xs text-gray-400 lg:table-cell">
                  {formatDate(inq.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={inq.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/inquiries/${inq.id}`}
                      className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-brand-charcoal"
                      title="View details"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      disabled={loadingId === inq.id}
                      className="flex h-7 w-7 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
                      title="Delete"
                    >
                      {loadingId === inq.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-right text-xs text-gray-400">
        {filtered.length} of {inquiries.length} inquiries
      </p>
    </div>
  );
}
