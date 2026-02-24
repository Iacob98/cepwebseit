"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname (kurz)</label>
              <input name="name" defaultValue={company.name} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname (voll)</label>
              <input name="fullName" defaultValue={company.fullName} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input name="tagline" defaultValue={company.tagline} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gründungsjahr</label>
              <input name="foundedYear" type="number" defaultValue={company.foundedYear} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input name="phone" defaultValue={company.phone} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon (Anzeige)</label>
              <input name="phoneDisplay" defaultValue={company.phoneDisplay} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input name="email" type="email" defaultValue={company.email} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input name="whatsapp" defaultValue={company.whatsapp} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input name="website" defaultValue={company.website} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Adresse */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
              <input name="street" defaultValue={company.address.street} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
              <input name="zip" defaultValue={company.address.zip} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
              <input name="city" defaultValue={company.address.city} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
              <input name="state" defaultValue={company.address.state} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
              <input name="country" defaultValue={company.address.country} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Öffnungszeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Werktags</label>
              <input name="weekdays" defaultValue={company.hours.weekdays} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Samstag</label>
              <input name="saturday" defaultValue={company.hours.saturday} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sonntag</label>
              <input name="sunday" defaultValue={company.hours.sunday} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input name="facebook" defaultValue={company.social.facebook} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input name="instagram" defaultValue={company.social.instagram} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input name="linkedin" defaultValue={company.social.linkedin} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
              <input name="twitter" defaultValue={company.social.twitter || ""} placeholder="https://x.com/..." className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Zertifikate */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Zertifikate</h2>
          <p className="text-sm text-gray-500 mb-3">Werden auf der &quot;Über uns&quot;-Seite angezeigt. Name leer lassen um auszublenden.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zertifikat {i + 1} — Name</label>
                  <input name={`cert_name_${i}`} defaultValue={company.certificates?.[i]?.name || ""} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Meisterbetrieb SHK" />
                </div>
                <AdminImageUpload name={`cert_image_${i}`} currentImage={company.certificates?.[i]?.image} label={`Zertifikat ${i + 1} — Logo`} />
              </div>
            ))}
          </div>
        </section>

        {/* Rechtliche Angaben (Impressum) */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rechtliche Angaben (Impressum)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Geschäftsführer</label>
              <input name="ceo" defaultValue={company.legal?.ceo || ""} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Thomas Berger" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registergericht</label>
              <input name="registergericht" defaultValue={company.legal?.registergericht || ""} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. Amtsgericht München" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Registernummer</label>
              <input name="registernummer" defaultValue={company.legal?.registernummer || ""} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. HRB 12345" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Umsatzsteuer-ID</label>
              <input name="ustId" defaultValue={company.legal?.ustId || ""} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="z.B. DE 123456789" />
            </div>
          </div>
        </section>

        {/* Statistiken */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Projekte abgeschlossen</label>
              <input name="projectsCompleted" type="number" defaultValue={company.stats.projectsCompleted} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zufriedenheitsrate (%)</label>
              <input name="satisfactionRate" type="number" defaultValue={company.stats.satisfactionRate} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max. Förderung (%)</label>
              <input name="maxFoerderung" type="number" defaultValue={company.stats.maxFoerderung} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>
      </div>
    </AdminForm>
  );
}
