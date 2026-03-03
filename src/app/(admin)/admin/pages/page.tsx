import Link from "next/link";
import { getPages, getSiteSettings } from "@/lib/dal";
import { VisibilityToggle } from "./VisibilityToggle";

const slugLabels: Record<string, string> = {
  home: "Startseite",
  photovoltaik: "Photovoltaik",
  energiespeicher: "Energiespeicher",
  foerderung: "Förderung",
  "ueber-uns": "Über uns",
  kontakt: "Kontakt",
  waermepumpen: "Wärmepumpen",
  "luft-wasser-waermepumpe": "Luft-Wasser-Wärmepumpe",
  "sole-wasser-waermepumpe": "Sole-Wasser-Wärmepumpe",
  "wasser-wasser-waermepumpe": "Wasser-Wasser-Wärmepumpe",
  referenzen: "Referenzen",
  "energie-rechner": "Energie-Rechner",
  ratgeber: "Ratgeber",
  "partner-werden": "Partner werden",
};

const PROTECTED_PAGES = ["home", "kontakt", "impressum", "datenschutz", "energie-rechner"];

export default async function PagesListPage() {
  const [pages, settings] = await Promise.all([getPages(), getSiteSettings()]);
  const slugs = Object.keys(pages);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Seitentexte</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-600">Seite</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Sektionen</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Sichtbar</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {slugs.map((slug) => {
              const isHidden = settings.hiddenPages.includes(slug);
              const isProtected = PROTECTED_PAGES.includes(slug);
              return (
                <tr key={slug} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {slugLabels[slug] || slug}
                    {isHidden && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Ausgeblendet
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{Object.keys(pages[slug]).length} Sektionen</td>
                  <td className="px-4 py-3 text-center">
                    <VisibilityToggle slug={slug} isHidden={isHidden} isProtected={isProtected} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/pages/${slug}`}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Bearbeiten
                    </Link>
                  </td>
                </tr>
              );
            })}
            {slugs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Keine Seiten vorhanden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
