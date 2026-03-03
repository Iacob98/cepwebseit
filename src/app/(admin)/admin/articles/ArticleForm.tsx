"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import type { Article } from "@/types";

interface ArticleFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  article?: Article;
}

export function ArticleForm({ action, article }: ArticleFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/articles">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input name="title" label="Titel" defaultValue={article?.title} required />
          </div>
          <div className="md:col-span-2">
            <Input name="slug" label="Slug" defaultValue={article?.slug} required placeholder="z.B. waermepumpe-im-altbau" className="font-mono" />
          </div>
          <div className="md:col-span-2">
            <Textarea name="excerpt" label="Kurztext (Excerpt)" defaultValue={article?.excerpt} required rows={2} />
          </div>
          <div className="md:col-span-2">
            <Textarea name="content" label="Inhalt (Markdown)" defaultValue={article?.content} required rows={15} className="font-mono" />
          </div>
          <Select
            name="category"
            label="Kategorie"
            defaultValue={article?.category || "Photovoltaik"}
            options={[
              { value: "Photovoltaik", label: "Photovoltaik" },
              { value: "Energiespeicher", label: "Energiespeicher" },
              { value: "Förderung", label: "Förderung" },
              { value: "Wärmepumpen", label: "Wärmepumpen" },
              { value: "Energiesparen", label: "Energiesparen" },
            ]}
          />
          <Input name="author" label="Autor" defaultValue={article?.author} placeholder="z.B. CEP Energie Redaktion" />
          <Input name="publishedDate" label="Veröffentlichungsdatum" type="date" defaultValue={article?.publishedDate || new Date().toISOString().split("T")[0]} required />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={article?.featured} className="rounded border-gray-300" />
              Featured (wird hervorgehoben)
            </label>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">SEO</h3>
          <div className="space-y-4">
            <Input name="metaTitle" label="Meta-Titel (optional)" defaultValue={article?.metaTitle} placeholder="Falls abweichend vom Titel" />
            <Textarea name="metaDescription" label="Meta-Beschreibung (optional)" defaultValue={article?.metaDescription} rows={2} placeholder="SEO-Beschreibung für Suchergebnisse" />
          </div>
        </div>
        <AdminImageUpload name="image" currentImage={article?.image} label="Artikelbild" />
      </div>
    </AdminForm>
  );
}
