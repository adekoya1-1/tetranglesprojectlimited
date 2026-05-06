import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

// PATCH /api/projects/[slug]/publish — toggle published (param is id)
export async function PATCH(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.slug;
    const existing = await db.project.findUnique({
      where: { id },
      select: { id: true, published: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = await db.project.update({
      where: { id },
      data: { published: !existing.published },
      select: { id: true, published: true, title: true },
    });

    return NextResponse.json({ data: project });
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle publish status" },
      { status: 500 }
    );
  }
}
