"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import type { FAQItem } from "@/types";

interface FAQFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  item?: FAQItem;
  defaultCategory?: string;
}

export function FAQForm({ action, item, defaultCategory }: FAQFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/faq">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <div className="space-y-4">
        <Select
          name="category"
          label="Kategorie"
          defaultValue={defaultCategory || "general"}
          options={[
            { value: "general", label: "Allgemein" },
            { value: "photovoltaik", label: "Photovoltaik" },
            { value: "energiespeicher", label: "Energiespeicher" },
            { value: "foerderung", label: "Förderung" },
            { value: "waermepumpen", label: "Wärmepumpen" },
          ]}
        />
        <Input name="question" label="Frage" defaultValue={item?.question} required />
        <Textarea name="answer" label="Antwort" defaultValue={item?.answer} required rows={5} />
      </div>
    </AdminForm>
  );
}
