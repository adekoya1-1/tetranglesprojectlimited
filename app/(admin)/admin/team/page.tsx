import { db } from "@/lib/db";
import { TeamManager } from "@/components/admin/TeamManager";

export const dynamic = "force-dynamic";

async function getTeamMembers() {
  return db.teamMember.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          Team
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage team members shown on the public website
        </p>
      </div>
      <TeamManager members={members} />
    </div>
  );
}
