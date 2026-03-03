"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getFAQ, saveFAQ } from "@/lib/dal";
import type { FAQData } from "@/lib/dal-schemas";

type FAQCategory = keyof FAQData;
const validCategories: FAQCategory[] = ["general", "photovoltaik", "energiespeicher", "foerderung", "waermepumpen"];

export async function createFAQAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const category = formData.get("category") as FAQCategory;
    if (!validCategories.includes(category)) return { error: "Ungültige Kategorie" };
    const faq = await getFAQ();
    const items = faq[category] ?? [];
    const maxId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    items.push({
      id: String(maxId + 1),
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      order: items.length,
    });
    faq[category] = items;
    await saveFAQ(faq);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/faq");
}

export async function updateFAQAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const category = formData.get("category") as FAQCategory;
    if (!validCategories.includes(category)) return { error: "Ungültige Kategorie" };
    const faq = await getFAQ();
    const items = faq[category] ?? [];
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return { error: "Nicht gefunden" };
    items[index] = {
      ...items[index],
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
    };
    faq[category] = items;
    await saveFAQ(faq);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteFAQAction(id: string, category: string): Promise<void> {
  const faq = await getFAQ();
  const cat = category as FAQCategory;
  if (!validCategories.includes(cat)) return;
  faq[cat] = (faq[cat] ?? []).filter((item) => item.id !== id);
  await saveFAQ(faq);
  revalidatePath("/", "layout");
  redirect("/admin/faq");
}
