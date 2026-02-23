"use server";

import { revalidatePath } from "next/cache";
import { getPages, savePages } from "@/lib/dal";
import { uploadImage } from "@/actions/admin/images";

export async function updatePageAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const slug = formData.get("slug") as string;
    const pages = await getPages();
    const content: Record<string, Record<string, unknown>> = {};

    // Collect all field keys for this page
    for (const [key, value] of formData.entries()) {
      if (key === "slug") continue;
      // Keys follow pattern: section.field (e.g., hero.title)
      const parts = key.split(".");
      if (parts.length === 2) {
        const [section, field] = parts;
        if (!content[section]) content[section] = {};
        content[section][field] = value;
      }
    }

    pages[slug] = content;
    await savePages(pages);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function updatePageImageAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const slug = formData.get("slug") as string;
    const section = formData.get("section") as string;
    const field = formData.get("field") as string;
    const file = formData.get("file") as File | null;
    const existing = formData.get("existing") as string | null;

    let imagePath: string | undefined;

    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      imagePath = result.path;
    } else if (existing) {
      imagePath = existing;
    }

    if (!imagePath) return { error: "Kein Bild ausgewählt" };

    const pages = await getPages();
    if (!pages[slug]) pages[slug] = {};
    if (!pages[slug][section]) pages[slug][section] = {};
    (pages[slug][section] as Record<string, unknown>)[field] = imagePath;

    await savePages(pages);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern des Bildes" };
  }
}

export async function updateAboutImagesAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const paths: string[] = [];

    for (let i = 0; i < 3; i++) {
      const file = formData.get(`image-${i}`) as File | null;
      const existing = formData.get(`existing-${i}`) as string | null;

      if (file && file.size > 0) {
        const result = await uploadImage(file);
        if (result.error) return { error: result.error };
        if (result.path) paths.push(result.path);
      } else if (existing) {
        paths.push(existing);
      }
    }

    const pages = await getPages();
    if (!pages.home) pages.home = {};
    if (!pages.home.about) pages.home.about = {};
    (pages.home.about as Record<string, unknown>).images = paths.join(",");

    await savePages(pages);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern der Bilder" };
  }
}
