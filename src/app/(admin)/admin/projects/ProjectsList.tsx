"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { Project } from "@/types";

const categoryLabels: Record<string, string> = {
  photovoltaik: "Photovoltaik",
  energiespeicher: "Energiespeicher",
  kombiniert: "PV + Speicher",
  waermepumpe: "Wärmepumpe",
};

interface ProjectsListProps {
  projects: Project[];
  deleteAction: (id: string) => Promise<void>;
}

export function ProjectsList({ projects, deleteAction }: ProjectsListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Bild</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Titel</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Kategorie</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Ort</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Jahr</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3">
                {p.image && (
                  <div className="h-12 w-16 rounded overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
              <td className="px-4 py-3 text-gray-600">{categoryLabels[p.category] || p.category}</td>
              <td className="px-4 py-3 text-gray-600">{p.location}</td>
              <td className="px-4 py-3 text-gray-600">{p.year}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(p.id)}
                    itemName="dieses Projekt"
                  />
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                Keine Projekte vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
