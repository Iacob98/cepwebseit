"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import type { HeroSlideData } from "@/lib/dal-schemas";

interface SlideFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  slide?: HeroSlideData;
}

export function SlideForm({ action, slide }: SlideFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/hero-slider">
      {slide?.id && <input type="hidden" name="id" value={slide.id} />}
      <div className="space-y-4">
        <AdminImageUpload name="image" currentImage={slide?.image} label="Slide-Bild" />
        <Input name="title" label="Titel (optional)" defaultValue={slide?.title} />
        <Input name="subtitle" label="Untertitel (optional)" defaultValue={slide?.subtitle} />
      </div>
    </AdminForm>
  );
}
