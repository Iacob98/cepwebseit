"use server";

import { revalidatePath } from "next/cache";
import { getServices, saveServices } from "@/lib/dal";
import { uploadImage } from "@/actions/admin/images";

export async function updateServicesAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const current = await getServices();
    const serviceCount = Number(formData.get("serviceCount")) || 0;
    const services = [];
    for (let i = 0; i < serviceCount; i++) {
      // Handle image upload
      let image: string | undefined;
      const file = formData.get(`service_image_${i}`) as File | null;
      const currentImage = formData.get(`service_image_${i}_current`) as string | null;
      if (file && file.size > 0) {
        const result = await uploadImage(file);
        if (result.path) image = result.path;
      } else if (currentImage) {
        image = currentImage;
      } else {
        image = current.services[i]?.image;
      }

      services.push({
        title: formData.get(`service_title_${i}`) as string,
        description: formData.get(`service_description_${i}`) as string,
        href: formData.get(`service_href_${i}`) as string,
        icon: formData.get(`service_icon_${i}`) as string,
        features: (formData.get(`service_features_${i}`) as string || "").split("\n").map(s => s.trim()).filter(Boolean),
        image,
      });
    }
    const wpCount = Number(formData.get("wpCount")) || 0;
    const waermepumpenTypes = [];
    for (let i = 0; i < wpCount; i++) {
      waermepumpenTypes.push({
        title: formData.get(`wp_title_${i}`) as string,
        slug: formData.get(`wp_slug_${i}`) as string,
        description: formData.get(`wp_description_${i}`) as string,
        advantages: (formData.get(`wp_advantages_${i}`) as string || "").split("\n").map(s => s.trim()).filter(Boolean),
        cop: formData.get(`wp_cop_${i}`) as string,
        idealFor: formData.get(`wp_idealFor_${i}`) as string,
      });
    }
    await saveServices({
      services: services.length > 0 ? services : current.services,
      waermepumpenTypes: waermepumpenTypes.length > 0 ? waermepumpenTypes : current.waermepumpenTypes,
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}
