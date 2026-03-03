import Link from "next/link";
import { getFAQ } from "@/lib/dal";
import { deleteFAQAction } from "@/actions/admin/faq";
import { FAQList } from "./FAQList";

const categoryLabels: Record<string, string> = {
  general: "Allgemein",
  photovoltaik: "Photovoltaik",
  energiespeicher: "Energiespeicher",
  foerderung: "Förderung",
  waermepumpen: "Wärmepumpen",
};

export default async function FAQPage() {
  const faq = await getFAQ();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
        <Link
          href="/admin/faq/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neue Frage
        </Link>
      </div>
      {Object.entries(faq).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {categoryLabels[category] || category}
          </h2>
          <FAQList items={items} category={category} deleteAction={deleteFAQAction} />
        </div>
      ))}
    </div>
  );
}
