"use server";

import { revalidatePath } from "next/cache";
import { getEmailSettings, saveEmailSettings } from "@/lib/dal";
import { uploadImage } from "@/actions/admin/images";
import type { EmailSettingsData } from "@/lib/dal-schemas";

export async function updateEmailSettingsAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const current = await getEmailSettings();

    // Handle logo upload
    let logoPath = (formData.get("logo_current") as string) || current.logo || "";
    const logoFile = formData.get("logo") as File;
    if (logoFile && logoFile.size > 0) {
      const result = await uploadImage(logoFile);
      if (result.path) logoPath = result.path;
      else if (result.error) return { error: result.error };
    }

    // Check if logo was explicitly removed
    if (formData.get("logo_remove") === "1") {
      logoPath = "";
    }

    const updated: EmailSettingsData = {
      subject: (formData.get("subject") as string) || current.subject,
      logo: logoPath,
      headerTitle: (formData.get("headerTitle") as string) || current.headerTitle,
      headerSubtitle: (formData.get("headerSubtitle") as string) ?? current.headerSubtitle,
      greeting: (formData.get("greeting") as string) || current.greeting,
      bodyText: (formData.get("bodyText") as string) || current.bodyText,
      contactPhone: (formData.get("contactPhone") as string) ?? current.contactPhone,
      contactEmail: (formData.get("contactEmail") as string) ?? current.contactEmail,
      closing: (formData.get("closing") as string) || current.closing,
      footerText: (formData.get("footerText") as string) ?? current.footerText,
      headerColor: (formData.get("headerColor") as string) || current.headerColor,
    };

    await saveEmailSettings(updated);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}
