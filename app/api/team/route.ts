import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";

// GET /api/team — public list of active members
export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ data: members });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST /api/team — admin add member
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = teamMemberSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const member = await db.teamMember.create({ data: parsed.data });
    return NextResponse.json({ data: member }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
