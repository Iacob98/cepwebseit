"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getProjects, saveProjects } from "@/lib/dal";
import { uploadImage } from "./images";

export async function createProjectAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const projects = await getProjects();
    const maxId = projects.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);

    let image = "";
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    projects.push({
      id: String(maxId + 1),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as "waermepumpe" | "photovoltaik" | "kombiniert",
      location: formData.get("location") as string,
      year: Number(formData.get("year")) || new Date().getFullYear(),
      specs: (formData.get("specs") as string || "").split("\n").map(s => s.trim()).filter(Boolean),
      image: image || undefined,
      order: projects.length,
    });
    await saveProjects(projects);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/projects");
}

export async function updateProjectAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return { error: "Nicht gefunden" };

    let image = formData.get("image_current") as string || projects[index].image;
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    projects[index] = {
      ...projects[index],
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as "waermepumpe" | "photovoltaik" | "kombiniert",
      location: formData.get("location") as string,
      year: Number(formData.get("year")) || projects[index].year,
      specs: (formData.get("specs") as string || "").split("\n").map(s => s.trim()).filter(Boolean),
      image: image || undefined,
    };
    await saveProjects(projects);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteProjectAction(id: string): Promise<void> {
  const projects = await getProjects();
  await saveProjects(projects.filter((p) => p.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}
