import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-condensed text-3xl font-black uppercase text-brand-charcoal">
          New Project
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new project to the portfolio
        </p>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
