"use server";

import { revalidatePath } from "next/cache";
import { getSiteSettings, saveSiteSettings, withFileLock } from "@/lib/dal";

const PROTECTED_PAGES = ["home", "kontakt", "impressum", "datenschutz", "energie-rechner"];

export async function togglePageVisibilityAction(slug: string): Promise<{ success?: boolean; error?: string }> {
  if (PROTECTED_PAGES.includes(slug)) {
    return { error: "Diese Seite kann nicht ausgeblendet werden." };
  }

  try {
    await withFileLock("site-settings.json", async () => {
      const settings = await getSiteSettings();
      const idx = settings.hiddenPages.indexOf(slug);
      if (idx >= 0) {
        settings.hiddenPages.splice(idx, 1);
      } else {
        settings.hiddenPages.push(slug);
      }
      await saveSiteSettings(settings);
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Ändern der Sichtbarkeit." };
  }
}
