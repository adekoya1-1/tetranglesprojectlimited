import { db } from "@/lib/db";
import { InquiryTable } from "@/components/admin/InquiryTable";

export const dynamic = "force-dynamic";

async function getInquiries() {
  return db.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      service: true,
      budget: true,
      status: true,
      createdAt: true,
    },
  });
}

export default async function AdminInquiriesPage() {
  const raw = await getInquiries();
  const inquiries = raw.map((i) => ({
    ...i,
    createdAt: i.createdAt.toISOString(),
  }));

  const newCount = inquiries.filter((i) => i.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          Inquiries
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {inquiries.length} total · {newCount} new
        </p>
      </div>
      <InquiryTable inquiries={inquiries as Parameters<typeof InquiryTable>[0]["inquiries"]} />
    </div>
  );
}
