import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { inquirySchema } from "@/lib/validations";
import { sendInquiryNotification } from "@/lib/email";
import type { InquiryStatus } from "@prisma/client";

// POST /api/inquiries — public form submission
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.create({ data: parsed.data });

    // Fire email — non-blocking, fail silently
    sendInquiryNotification({ ...parsed.data, id: inquiry.id }).catch((err) =>
      console.error("[email] Failed to send inquiry notification:", err)
    );

    return NextResponse.json(
      { data: inquiry, message: "Enquiry submitted successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

// GET /api/inquiries — admin list with filters
export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const pageSize = Math.min(50, parseInt(searchParams.get("pageSize") ?? "20"));

    const where = {
      ...(status && status !== "ALL"
        ? { status: status as InquiryStatus }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { phone: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [inquiries, total] = await Promise.all([
      db.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.inquiry.count({ where }),
    ]);

    return NextResponse.json({
      data: inquiries,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
