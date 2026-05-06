import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

type Params = { params: { slug: string } };

// GET /api/projects/[slug] — single project by slug or id
export async function GET(_req: Request, { params }: Params) {
  try {
    const val = params.slug;
    const project = await db.project.findFirst({
      where: { OR: [{ slug: val }, { id: val }], published: true },
      include: { images: { orderBy: { order: "asc" } } },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[slug] — admin update (param is id)
export async function PUT(request: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.slug;
    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Re-slug if title changed
    let slug = existing.slug;
    if (data.title && data.title !== existing.title) {
      const base = slugify(data.title);
      slug = base;
      let counter = 1;
      while (
        await db.project.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${base}-${counter++}`;
      }
    }

    const { images, ...projectData } = data;

    const project = await db.$transaction(async (tx) => {
      if (images !== undefined) {
        await tx.projectImage.deleteMany({ where: { projectId: id } });
      }
      return tx.project.update({
        where: { id },
        data: {
          ...projectData,
          slug,
          ...(images !== undefined && images.length > 0
            ? {
                images: {
                  create: images.map((img, i) => ({
                    url: img.url,
                    publicId: img.publicId,
                    isPrimary: i === 0,
                    order: i,
                  })),
                },
              }
            : {}),
        },
        include: { images: { orderBy: { order: "asc" } } },
      });
    });

    return NextResponse.json({ data: project });
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[slug] — admin delete (param is id)
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params.slug;
    const existing = await db.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await db.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
