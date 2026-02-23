"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { Partner } from "@/types";

interface PartnersListProps {
  partners: Partner[];
  deleteAction: (id: string) => Promise<void>;
}

export function PartnersList({ partners, deleteAction }: PartnersListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Logo</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Featured</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((p) => (
            <tr key={p.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3">
                {p.logo && (
                  <div className="h-10 w-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={p.name} className="h-full w-full object-contain" />
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
              <td className="px-4 py-3">
                {p.featured ? (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {p.badge ?? "Featured"}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/partners/${p.id}/edit`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(p.id!)}
                    itemName="diesen Partner"
                  />
                </div>
              </td>
            </tr>
          ))}
          {partners.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                Keine Partner vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
