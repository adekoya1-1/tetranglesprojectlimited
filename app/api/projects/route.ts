import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import type { ProjectCategory } from "@prisma/client";

// GET /api/projects — public list with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const all = searchParams.get("all"); // admin: include unpublished

    const session = all ? await getAuthSession() : null;

    const projects = await db.project.findMany({
      where: {
        ...(all && session ? {} : { published: true }),
        ...(category && category !== "ALL"
          ? { category: category as ProjectCategory }
          : {}),
        ...(featured === "true" ? { featured: true } : {}),
      },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ data: projects });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects — admin create
export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Auto-generate unique slug
    const base = slugify(data.title);
    let slug = base;
    let counter = 1;
    while (await db.project.findUnique({ where: { slug } })) {
      slug = `${base}-${counter++}`;
    }

    const { images, ...projectData } = data;
    const project = await db.project.create({
      data: {
        ...projectData,
        slug,
        ...(images && images.length > 0
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

    return NextResponse.json({ data: project }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
