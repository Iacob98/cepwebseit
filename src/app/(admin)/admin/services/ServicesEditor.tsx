"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { Service, WaermepumpenType } from "@/types";

interface ServicesEditorProps {
  data: { services: Service[]; waermepumpenTypes: WaermepumpenType[] };
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function ServicesEditor({ data, action }: ServicesEditorProps) {
  return (
    <AdminForm action={action} backHref="/admin">
      <input type="hidden" name="serviceCount" value={data.services.length} />
      <input type="hidden" name="wpCount" value={data.waermepumpenTypes.length} />

      {/* Services */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dienstleistungen</h2>
        <div className="space-y-4">
          {data.services.map((service, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="text-sm font-medium text-gray-500 mb-2 block">Dienstleistung {i + 1}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name={`service_title_${i}`} label="Titel" defaultValue={service.title} />
                <Input name={`service_href_${i}`} label="Link (href)" defaultValue={service.href} />
                <Input name={`service_icon_${i}`} label="Icon" defaultValue={service.icon} />
                <div className="md:col-span-2">
                  <Textarea name={`service_description_${i}`} label="Beschreibung" defaultValue={service.description} rows={2} />
                </div>
                <div className="md:col-span-2">
                  <Textarea name={`service_features_${i}`} label="Features (eine pro Zeile)" defaultValue={service.features.join("\n")} rows={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wärmepumpentypen */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Wärmepumpentypen</h2>
        <div className="space-y-4">
          {data.waermepumpenTypes.map((wp, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="text-sm font-medium text-gray-500 mb-2 block">{wp.title}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name={`wp_title_${i}`} label="Titel" defaultValue={wp.title} />
                <Input name={`wp_slug_${i}`} label="Slug" defaultValue={wp.slug} />
                <div className="md:col-span-2">
                  <Textarea name={`wp_description_${i}`} label="Beschreibung" defaultValue={wp.description} rows={2} />
                </div>
                <Input name={`wp_cop_${i}`} label="COP" defaultValue={wp.cop} />
                <Input name={`wp_idealFor_${i}`} label="Ideal für" defaultValue={wp.idealFor} />
                <div className="md:col-span-2">
                  <Textarea name={`wp_advantages_${i}`} label="Vorteile (eine pro Zeile)" defaultValue={wp.advantages.join("\n")} rows={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminForm>
  );
}
