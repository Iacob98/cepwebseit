"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AboutImagesEditor } from "./AboutImagesEditor";
import { PageImageField } from "./PageImageField";

const IMAGE_FIELDS = new Set(["image", "diagramImage"]);

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero-Bereich",
  about: "Über uns",
  howItWorks: "So funktioniert's",
  foerderungTeaser: "Förderung-Teaser",
  cta: "Call-to-Action",
  types: "WP-Typen",
  benefits: "Vorteile",
  comparison: "Vergleich",
  components: "Komponenten",
  certificates: "Zertifikate",
  timeline: "Zeitstrahl",
  team: "Team",
  overview: "Übersicht",
  process: "Prozess",
  keyFacts: "Fakten-Übersicht",
  proscons: "Vorteile & Nachteile",
  function: "Funktionsweise",
  costs: "Kosten & Wirtschaftlichkeit",
  pvSynergy: "WP + Photovoltaik",
  installation: "Installation",
  suitability: "Eignungscheck",
  charts: "Diagramme",
  advantages: "Vorteile",
  requirements: "Voraussetzungen",
};

interface PageEditorProps {
  slug: string;
  content: Record<string, Record<string, unknown>>;
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function PageEditor({ slug, content, action }: PageEditorProps) {
  const aboutImages = slug === "home"
    ? String((content.about as Record<string, unknown>)?.images ?? "")
    : "";

  return (
    <>
      <AdminForm action={action} backHref="/admin/pages">
        <input type="hidden" name="slug" value={slug} />
        <div className="space-y-6">
          {Object.entries(content).map(([section, fields]) => (
            <div key={section} className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-md font-semibold text-gray-900 mb-3">{SECTION_LABELS[section] || section}</h3>
              <div className="space-y-3">
                {Object.entries(fields).map(([field, value]) => {
                  // Skip images field in about section — handled by AboutImagesEditor
                  if (slug === "home" && section === "about" && field === "images") {
                    return null;
                  }

                  // Render image uploader for image fields
                  if (IMAGE_FIELDS.has(field)) {
                    return (
                      <div key={field}>
                        <PageImageField
                          slug={slug}
                          section={section}
                          field={field}
                          currentImage={String(value)}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                      {String(value).length > 100 ? (
                        <textarea
                          name={`${section}.${field}`}
                          defaultValue={String(value)}
                          rows={4}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      ) : (
                        <input
                          name={`${section}.${field}`}
                          defaultValue={String(value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </AdminForm>

      {slug === "home" && (
        <div className="mt-6">
          <AboutImagesEditor images={aboutImages} />
        </div>
      )}
    </>
  );
}
