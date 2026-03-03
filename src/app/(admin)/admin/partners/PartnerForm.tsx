"use client";

import { useState } from "react";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { X } from "lucide-react";
import type { Partner } from "@/types";

interface PartnerFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  partner?: Partner;
  featuredCount?: number;
}

export function PartnerForm({ action, partner, featuredCount = 0 }: PartnerFormProps) {
  const [featured, setFeatured] = useState(partner?.featured ?? false);
  const [benefits, setBenefits] = useState<string[]>(partner?.benefits ?? []);

  const alreadyFeatured = partner?.featured ? featuredCount - 1 : featuredCount;
  const canFeature = alreadyFeatured < 4;

  function addBenefit() {
    if (benefits.length < 6) setBenefits([...benefits, ""]);
  }

  function removeBenefit(index: number) {
    setBenefits(benefits.filter((_, i) => i !== index));
  }

  function updateBenefit(index: number, value: string) {
    setBenefits(benefits.map((b, i) => (i === index ? value : b)));
  }

  return (
    <AdminForm action={action} backHref="/admin/partners">
      {partner?.id && <input type="hidden" name="id" value={partner.id} />}
      <input type="hidden" name="benefits" value={JSON.stringify(benefits.filter(Boolean))} />
      <div className="space-y-4">
        <Input name="name" label="Name" defaultValue={partner?.name} required />
        <AdminImageUpload name="logo" currentImage={partner?.logo} label="Logo" />
        <Input name="description" label="Kurzbeschreibung" defaultValue={partner?.description} placeholder="z.B. Offizieller Bosch Partner — Direktvertrieb & Premiumservice" />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={featured}
            disabled={!featured && !canFeature}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">
            Featured (hervorgehoben)
          </label>
          {!canFeature && !featured && (
            <span className="text-xs text-red-500 ml-2">Max. 4 Featured-Partner erreicht</span>
          )}
        </div>

        {featured && (
          <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Featured-Einstellungen</p>
            <Input name="badge" label="Badge-Text" defaultValue={partner?.badge} placeholder="z.B. Zertifizierter Partner" />
            <Textarea name="featuredText" label="Ausführliche Beschreibung" defaultValue={partner?.featuredText} rows={3} placeholder="Detaillierter Text zur Partnerschaft…" />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Vorteile</label>
              <div className="space-y-2">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={b}
                      onChange={(e) => updateBenefit(i, e.target.value)}
                      className="flex-1 h-11 rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:outline-none"
                      placeholder={`Vorteil ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      className="rounded-lg border border-gray-200 px-2 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {benefits.length < 6 && (
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
                  >
                    + Vorteil hinzufügen
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminForm>
  );
}
