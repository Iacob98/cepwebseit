"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import type { CompanyData } from "@/types";

interface CompanyFormProps {
  company: CompanyData;
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function CompanyForm({ company, action }: CompanyFormProps) {
  return (
    <AdminForm action={action} backHref="/admin">
      <div className="space-y-8">
        {/* Allgemein */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Allgemein</h2>
          <div className="mb-4">
            <AdminImageUpload name="logo" currentImage={company.logo} label="Firmenlogo" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" label="Firmenname (kurz)" defaultValue={company.name} />
            <Input name="fullName" label="Firmenname (voll)" defaultValue={company.fullName} />
            <div className="md:col-span-2">
              <Input name="tagline" label="Tagline" defaultValue={company.tagline} />
            </div>
            <Input name="foundedYear" label="Gründungsjahr" type="number" defaultValue={company.foundedYear} />
          </div>
        </section>

        {/* Kontakt */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="phone" label="Telefon" defaultValue={company.phone} />
            <Input name="phoneDisplay" label="Telefon (Anzeige)" defaultValue={company.phoneDisplay} />
            <Input name="email" label="E-Mail" type="email" defaultValue={company.email} />
            <Input name="whatsapp" label="WhatsApp" defaultValue={company.whatsapp} />
            <Input name="website" label="Website" defaultValue={company.website} />
          </div>
        </section>

        {/* Adresse */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input name="street" label="Straße" defaultValue={company.address.street} />
            </div>
            <Input name="zip" label="PLZ" defaultValue={company.address.zip} />
            <Input name="city" label="Stadt" defaultValue={company.address.city} />
            <Input name="state" label="Bundesland" defaultValue={company.address.state} />
            <Input name="country" label="Land" defaultValue={company.address.country} />
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Öffnungszeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="weekdays" label="Werktags" defaultValue={company.hours.weekdays} />
            <Input name="saturday" label="Samstag" defaultValue={company.hours.saturday} />
            <Input name="sunday" label="Sonntag" defaultValue={company.hours.sunday} />
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="facebook" label="Facebook" defaultValue={company.social.facebook} />
            <Input name="instagram" label="Instagram" defaultValue={company.social.instagram} />
            <Input name="linkedin" label="LinkedIn" defaultValue={company.social.linkedin} />
            <Input name="twitter" label="Twitter / X" defaultValue={company.social.twitter || ""} placeholder="https://x.com/..." />
          </div>
        </section>

        {/* Zertifikate */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Zertifikate</h2>
          <p className="text-sm text-gray-500 mb-3">Werden auf der &quot;Über uns&quot;-Seite angezeigt. Name leer lassen um auszublenden.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4 space-y-3">
                <Input name={`cert_name_${i}`} label={`Zertifikat ${i + 1} — Name`} defaultValue={company.certificates?.[i]?.name || ""} placeholder="z.B. Meisterbetrieb SHK" />
                <AdminImageUpload name={`cert_image_${i}`} currentImage={company.certificates?.[i]?.image} label={`Zertifikat ${i + 1} — Logo`} />
              </div>
            ))}
          </div>
        </section>

        {/* Rechtliche Angaben (Impressum) */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rechtliche Angaben (Impressum)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="ceo" label="Geschäftsführer" defaultValue={company.legal?.ceo || ""} placeholder="z.B. Thomas Berger" />
            <Input name="registergericht" label="Registergericht" defaultValue={company.legal?.registergericht || ""} placeholder="z.B. Amtsgericht München" />
            <Input name="registernummer" label="Registernummer" defaultValue={company.legal?.registernummer || ""} placeholder="z.B. HRB 12345" />
            <Input name="ustId" label="Umsatzsteuer-ID" defaultValue={company.legal?.ustId || ""} placeholder="z.B. DE 123456789" />
          </div>
        </section>

        {/* Statistiken */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="projectsCompleted" label="Projekte abgeschlossen" type="number" defaultValue={company.stats.projectsCompleted} />
            <Input name="satisfactionRate" label="Zufriedenheitsrate (%)" type="number" defaultValue={company.stats.satisfactionRate} />
            <Input name="maxFoerderung" label="Max. Förderung (%)" type="number" defaultValue={company.stats.maxFoerderung} />
          </div>
        </section>

      </div>
    </AdminForm>
  );
}
