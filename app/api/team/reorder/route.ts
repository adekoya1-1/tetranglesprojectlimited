import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { reorderSchema } from "@/lib/validations";

// PATCH /api/team/reorder — admin bulk reorder
export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = reorderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await db.$transaction(
      parsed.data.items.map(({ id, order }) =>
        db.teamMember.update({ where: { id }, data: { order } })
      )
    );

    return NextResponse.json({ message: "Order updated" });
  } catch {
    return NextResponse.json(
      { error: "Failed to reorder team members" },
      { status: 500 }
    );
  }
}
