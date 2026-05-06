import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { InquiryDetail } from "@/components/admin/InquiryDetail";

interface Props {
  params: { id: string };
}

async function getInquiry(id: string) {
  return db.inquiry.findUnique({ where: { id } });
}

export default async function InquiryDetailPage({ params }: Props) {
  const inquiry = await getInquiry(params.id);
  if (!inquiry) notFound();

  return (
    <InquiryDetail
      inquiry={{
        ...inquiry,
        createdAt: inquiry.createdAt.toISOString(),
        updatedAt: inquiry.updatedAt.toISOString(),
      }}
    />
  );
}
