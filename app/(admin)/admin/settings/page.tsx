import { db } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

async function getSettings() {
  return db.siteSettings.findUnique({ where: { id: "singleton" } });
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Contact details and social media links shown across the site
        </p>
      </div>
      <SettingsForm
        initialData={
          settings
            ? {
                whatsappNumber: settings.whatsappNumber,
                phone2: settings.phone2,
                email: settings.email,
                address: settings.address,
                instagram: settings.instagram,
                facebook: settings.facebook,
              }
            : null
        }
      />
    </div>
  );
}
