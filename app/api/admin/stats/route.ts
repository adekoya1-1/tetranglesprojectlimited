import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

// GET /api/admin/stats — dashboard KPIs
export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalInquiries,
      newInquiries,
      inquiriesThisWeek,
      convertedInquiries,
      teamMembers,
    ] = await Promise.all([
      db.project.count(),
      db.project.count({ where: { published: true } }),
      db.project.count({ where: { featured: true } }),
      db.inquiry.count(),
      db.inquiry.count({ where: { status: "NEW" } }),
      db.inquiry.count({ where: { createdAt: { gte: weekAgo } } }),
      db.inquiry.count({ where: { status: "CONVERTED" } }),
      db.teamMember.count({ where: { isActive: true } }),
    ]);

    const conversionRate =
      totalInquiries > 0
        ? Math.round((convertedInquiries / totalInquiries) * 100)
        : 0;

    return NextResponse.json({
      data: {
        totalProjects,
        publishedProjects,
        featuredProjects,
        totalInquiries,
        newInquiries,
        inquiriesThisWeek,
        convertedInquiries,
        conversionRate,
        teamMembers,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
