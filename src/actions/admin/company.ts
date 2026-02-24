"use server";

import { revalidatePath } from "next/cache";
import { getCompany, saveCompany } from "@/lib/dal";
import { uploadImage } from "@/actions/admin/images";
import type { CompanyData } from "@/types";

async function buildCertificates(
  formData: FormData,
  current: CompanyData
): Promise<{ name: string; image?: string }[]> {
  const results: { name: string; image?: string }[] = [];
  for (let i = 0; i < 4; i++) {
    const name = (formData.get(`cert_name_${i}`) as string) || "";
    if (!name) continue;
    let image = (formData.get(`cert_image_${i}_current`) as string) || current.certificates?.[i]?.image;
    const imageFile = formData.get(`cert_image_${i}`) as File;
    if (imageFile && imageFile.size > 0) {
      const result = await uploadImage(imageFile);
      if (result.path) image = result.path;
    }
    results.push({ name, image });
  }
  return results;
}

export async function updateCompanyAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const current = await getCompany();

    // Handle logo upload
    let logoPath = (formData.get("logo_current") as string) || current.logo;
    const logoFile = formData.get("logo") as File;
    if (logoFile && logoFile.size > 0) {
      const result = await uploadImage(logoFile);
      if (result.path) logoPath = result.path;
      else if (result.error) return { error: result.error };
    }

    const updated: CompanyData = {
      ...current,
      logo: logoPath,
      name: formData.get("name") as string || current.name,
      fullName: formData.get("fullName") as string || current.fullName,
      tagline: formData.get("tagline") as string || current.tagline,
      foundedYear: Number(formData.get("foundedYear")) || current.foundedYear,
      phone: formData.get("phone") as string || current.phone,
      phoneDisplay: formData.get("phoneDisplay") as string || current.phoneDisplay,
      email: formData.get("email") as string || current.email,
      whatsapp: formData.get("whatsapp") as string || current.whatsapp,
      website: formData.get("website") as string || current.website,
      address: {
        street: formData.get("street") as string || current.address.street,
        zip: formData.get("zip") as string || current.address.zip,
        city: formData.get("city") as string || current.address.city,
        state: formData.get("state") as string || current.address.state,
        country: formData.get("country") as string || current.address.country,
      },
      hours: {
        weekdays: formData.get("weekdays") as string || current.hours.weekdays,
        saturday: formData.get("saturday") as string || current.hours.saturday,
        sunday: formData.get("sunday") as string || current.hours.sunday,
      },
      social: {
        facebook: formData.get("facebook") as string || current.social.facebook,
        instagram: formData.get("instagram") as string || current.social.instagram,
        linkedin: formData.get("linkedin") as string || current.social.linkedin,
        twitter: (formData.get("twitter") as string) || current.social.twitter || undefined,
      },
      stats: {
        projectsCompleted: Number(formData.get("projectsCompleted")) || current.stats.projectsCompleted,
        satisfactionRate: Number(formData.get("satisfactionRate")) || current.stats.satisfactionRate,
        maxFoerderung: Number(formData.get("maxFoerderung")) || current.stats.maxFoerderung,
      },
      legal: {
        ceo: formData.get("ceo") as string || current.legal?.ceo || "",
        registergericht: formData.get("registergericht") as string || current.legal?.registergericht || "",
        registernummer: formData.get("registernummer") as string || current.legal?.registernummer || "",
        ustId: formData.get("ustId") as string || current.legal?.ustId || "",
      },
      certificates: await buildCertificates(formData, current),
    };

    await saveCompany(updated);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}
