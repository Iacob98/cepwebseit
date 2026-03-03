"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { TimelineEvent } from "@/types";

interface TimelineEditorProps {
  timeline: TimelineEvent[];
  updateAction: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  deleteAction: (id: string) => Promise<void>;
}

export function TimelineEditor({ timeline, updateAction, deleteAction }: TimelineEditorProps) {
  const sorted = [...timeline].sort((a, b) => (a.year ?? 0) - (b.year ?? 0));

  return (
    <AdminForm action={updateAction} backHref="/admin">
      <input type="hidden" name="count" value={sorted.length} />
      <div className="space-y-4">
        {sorted.map((event, i) => (
          <div key={event.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Ereignis {i + 1}</span>
              <DeleteConfirmDialog
                onDelete={() => deleteAction(event.id!)}
                itemName="dieses Ereignis"
              />
            </div>
            <input type="hidden" name={`id_${i}`} value={event.id} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input name={`year_${i}`} label="Jahr" type="number" defaultValue={event.year} />
              <div className="md:col-span-3">
                <Input name={`title_${i}`} label="Titel" defaultValue={event.title} />
              </div>
              <div className="md:col-span-4">
                <Textarea name={`description_${i}`} label="Beschreibung" defaultValue={event.description} rows={2} />
              </div>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <p className="text-center text-gray-500 py-8">Keine Ereignisse vorhanden.</p>
        )}
      </div>
    </AdminForm>
  );
}
