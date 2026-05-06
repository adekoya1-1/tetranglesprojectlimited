import { db } from "@/lib/db";
import { ServiceEditor } from "@/components/admin/ServiceEditor";

export const dynamic = "force-dynamic";

async function getServices() {
  return db.service.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      longDesc: true,
    },
  });
}

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          Services
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Edit the content shown on the public services page
        </p>
      </div>
      <ServiceEditor services={services} />
    </div>
  );
}
