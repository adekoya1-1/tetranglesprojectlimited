import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";

type Params = { params: { id: string } };

// PUT /api/team/[id] — admin update member
export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.teamMember.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = teamMemberSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const member = await db.teamMember.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json({ data: member });
  } catch {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE /api/team/[id] — admin delete member
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await db.teamMember.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    await db.teamMember.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Team member deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
