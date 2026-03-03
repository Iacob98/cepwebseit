"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getContactSubmissions,
  saveContactSubmissions,
  getRechnerSubmissions,
  saveRechnerSubmissions,
  getPartnerSubmissions,
  savePartnerSubmissions,
  withFileLock,
} from "@/lib/dal";

export async function deleteContactSubmissionAction(id: string): Promise<void> {
  await withFileLock("contact-submissions.json", async () => {
    const submissions = await getContactSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);
    await saveContactSubmissions(filtered);
  });
  revalidatePath("/", "layout");
  redirect("/admin/submissions");
}

export async function deleteRechnerSubmissionAction(id: string): Promise<void> {
  await withFileLock("rechner-submissions.json", async () => {
    const submissions = await getRechnerSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);
    await saveRechnerSubmissions(filtered);
  });
  revalidatePath("/", "layout");
  redirect("/admin/submissions");
}

export async function markContactReadAction(id: string): Promise<void> {
  await withFileLock("contact-submissions.json", async () => {
    const submissions = await getContactSubmissions();
    const index = submissions.findIndex((s) => s.id === id);
    if (index !== -1) {
      submissions[index].read = !submissions[index].read;
      await saveContactSubmissions(submissions);
    }
  });
  revalidatePath("/", "layout");
}

export async function markRechnerReadAction(id: string): Promise<void> {
  await withFileLock("rechner-submissions.json", async () => {
    const submissions = await getRechnerSubmissions();
    const index = submissions.findIndex((s) => s.id === id);
    if (index !== -1) {
      submissions[index].read = !submissions[index].read;
      await saveRechnerSubmissions(submissions);
    }
  });
  revalidatePath("/", "layout");
}

export async function deletePartnerSubmissionAction(id: string): Promise<void> {
  await withFileLock("partner-submissions.json", async () => {
    const submissions = await getPartnerSubmissions();
    const filtered = submissions.filter((s) => s.id !== id);
    await savePartnerSubmissions(filtered);
  });
  revalidatePath("/", "layout");
  redirect("/admin/submissions");
}

export async function markPartnerReadAction(id: string): Promise<void> {
  await withFileLock("partner-submissions.json", async () => {
    const submissions = await getPartnerSubmissions();
    const index = submissions.findIndex((s) => s.id === id);
    if (index !== -1) {
      submissions[index].read = !submissions[index].read;
      await savePartnerSubmissions(submissions);
    }
  });
  revalidatePath("/", "layout");
}
