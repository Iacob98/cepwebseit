"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import type { Testimonial } from "@/types";

interface TestimonialFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  testimonial?: Testimonial;
}

export function TestimonialForm({ action, testimonial }: TestimonialFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/testimonials">
      {testimonial?.id && <input type="hidden" name="id" value={testimonial.id} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" label="Name" defaultValue={testimonial?.name} required />
        <Input name="location" label="Ort" defaultValue={testimonial?.location} required />
        <Select
          name="rating"
          label="Bewertung (1-5)"
          defaultValue={String(testimonial?.rating ?? 5)}
          options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} ${"★".repeat(n)}` }))}
        />
        <Input name="service" label="Dienstleistung" defaultValue={testimonial?.service} required />
        <Input name="date" label="Datum" defaultValue={testimonial?.date} placeholder="z.B. März 2024" required />
        <div className="md:col-span-2">
          <Textarea name="text" label="Text" defaultValue={testimonial?.text} required rows={4} />
        </div>
        <div className="md:col-span-2">
          <AdminImageUpload name="image" currentImage={testimonial?.image} label="Kundenfoto" />
        </div>
      </div>
    </AdminForm>
  );
}
