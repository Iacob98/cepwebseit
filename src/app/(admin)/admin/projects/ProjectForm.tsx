"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import type { Project } from "@/types";

interface ProjectFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  project?: Project;
}

export function ProjectForm({ action, project }: ProjectFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/projects">
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input name="title" label="Titel" defaultValue={project?.title} required />
          </div>
          <div className="md:col-span-2">
            <Textarea name="description" label="Beschreibung" defaultValue={project?.description} required rows={3} />
          </div>
          <Select
            name="category"
            label="Kategorie"
            defaultValue={project?.category || "photovoltaik"}
            options={[
              { value: "photovoltaik", label: "Photovoltaik" },
              { value: "energiespeicher", label: "Energiespeicher" },
              { value: "kombiniert", label: "PV + Speicher" },
              { value: "waermepumpe", label: "Wärmepumpe" },
            ]}
          />
          <Input name="location" label="Ort" defaultValue={project?.location} required />
          <Input name="year" label="Jahr" type="number" defaultValue={project?.year || new Date().getFullYear()} />
        </div>
        <Textarea name="specs" label="Spezifikationen (eine pro Zeile)" defaultValue={project?.specs?.join("\n")} rows={4} placeholder={"z.B. 10 kWp Photovoltaikanlage\nLuft-Wasser-Wärmepumpe"} />
        <AdminImageUpload name="image" currentImage={project?.image} label="Projektbild" />
      </div>
    </AdminForm>
  );
}
