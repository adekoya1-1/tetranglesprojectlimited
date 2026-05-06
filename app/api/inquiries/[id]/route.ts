import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { inquiryPatchSchema } from "@/lib/validations";

type Params = { params: { id: string } };

// GET /api/inquiries/[id] — admin single inquiry
export async function GET(_req: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const inquiry = await db.inquiry.findUnique({ where: { id: params.id } });
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ data: inquiry });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch inquiry" },
      { status: 500 }
    );
  }
}

// PATCH /api/inquiries/[id] — admin update status / notes
export async function PATCH(request: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.inquiry.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = inquiryPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const inquiry = await db.inquiry.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        ...(parsed.data.respondedAt
          ? { respondedAt: new Date(parsed.data.respondedAt) }
          : {}),
      },
    });

    return NextResponse.json({ data: inquiry });
  } catch {
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/inquiries/[id] — admin delete
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.inquiry.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    await db.inquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Inquiry deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
