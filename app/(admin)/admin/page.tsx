import Link from "next/link";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Building2,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";

async function getDashboardData() {
  try {
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalInquiries,
      newInquiries,
      convertedInquiries,
      teamMembers,
      recentInquiries,
    ] = await Promise.all([
      db.project.count(),
      db.project.count({ where: { published: true } }),
      db.project.count({ where: { featured: true } }),
      db.inquiry.count(),
      db.inquiry.count({ where: { status: "NEW" } }),
      db.inquiry.count({ where: { status: "CONVERTED" } }),
      db.teamMember.count({ where: { isActive: true } }),
      db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

    const conversionRate =
      totalInquiries > 0
        ? Math.round((convertedInquiries / totalInquiries) * 100)
        : 0;

    return {
      dbError: false,
      stats: {
        totalProjects,
        publishedProjects,
        featuredProjects,
        totalInquiries,
        newInquiries,
        convertedInquiries,
        conversionRate,
        teamMembers,
      },
      recentInquiries,
    };
  } catch {
    return {
      dbError: true,
      stats: {
        totalProjects: 0,
        publishedProjects: 0,
        featuredProjects: 0,
        totalInquiries: 0,
        newInquiries: 0,
        convertedInquiries: 0,
        conversionRate: 0,
        teamMembers: 0,
      },
      recentInquiries: [],
    };
  }
}

export default async function AdminDashboard() {
  const session = await getAuthSession();
  if (!session) redirect("/login");

  const { dbError, stats, recentInquiries } = await getDashboardData();

  const kpiCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      sub: `${stats.publishedProjects} published`,
      icon: Building2,
      href: "/admin/projects",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Inquiries",
      value: stats.totalInquiries,
      sub: `${stats.newInquiries} new`,
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Team Members",
      value: stats.teamMembers,
      sub: "active members",
      icon: Users,
      href: "/admin/team",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      sub: `${stats.convertedInquiries} converted`,
      icon: TrendingUp,
      href: "/admin/inquiries",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {session.user?.name ?? "Admin"}
        </p>
      </div>

      {/* DB error banner */}
      {dbError && (
        <div className="flex items-start gap-3 bg-red-50 px-4 py-3 ring-1 ring-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-semibold text-red-700">Database unavailable</p>
            <p className="mt-0.5 text-xs text-red-500">
              Could not reach the database server. Check your Supabase project status and
              the <code className="font-mono">DATABASE_URL</code> in your environment variables.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group flex items-start gap-4 bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
            >
              <div className={`p-2.5 ${card.bg}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-brand-charcoal">
                  {card.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {card.label}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">{card.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <Star className="h-4 w-4 text-yellow-500" />
          <div>
            <p className="text-lg font-bold text-brand-charcoal">
              {stats.featuredProjects}
            </p>
            <p className="text-xs text-gray-500">Featured Projects</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <Clock className="h-4 w-4 text-amber-500" />
          <div>
            <p className="text-lg font-bold text-brand-charcoal">
              {stats.newInquiries}
            </p>
            <p className="text-xs text-gray-500">Awaiting Review</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-lg font-bold text-brand-charcoal">
              {stats.convertedInquiries}
            </p>
            <p className="text-xs text-gray-500">Converted Leads</p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white shadow-sm ring-1 ring-gray-200">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-condensed text-lg font-bold uppercase text-brand-charcoal">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No inquiries yet
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentInquiries.map((inquiry) => (
              <Link
                key={inquiry.id}
                href={`/admin/inquiries/${inquiry.id}`}
                className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-charcoal">
                    {inquiry.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {inquiry.email} · {inquiry.service ?? "General"}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-4">
                  <StatusBadge
                    status={
                      inquiry.status as
                        | "NEW"
                        | "IN_REVIEW"
                        | "CONTACTED"
                        | "CONVERTED"
                        | "CLOSED"
                    }
                  />
                  <span className="hidden text-[11px] text-gray-400 sm:block">
                    {formatDate(inquiry.createdAt.toISOString())}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Add New Project", href: "/admin/projects/new", icon: Building2 },
          { label: "Manage Team", href: "/admin/team", icon: Users },
          { label: "Site Settings", href: "/admin/settings", icon: MessageSquare },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-between bg-brand-charcoal px-5 py-4 text-white transition-opacity hover:opacity-90"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-brand-orange" />
              <span className="text-sm font-semibold">{label}</span>
            </div>
            <ArrowRight className="h-4 w-4 text-white/40" />
          </Link>
        ))}
      </div>
    </div>
  );
}
