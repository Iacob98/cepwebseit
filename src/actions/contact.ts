"use server";

import { contactFormSchema } from "@/lib/schemas";
import { appendContactSubmission } from "@/lib/dal";
import { sendNotificationEmail, sendAutoReply } from "@/lib/email";
import type { ContactFormData } from "@/types";

export async function submitContact(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Validierungsfehler. Bitte überprüfen Sie Ihre Angaben." };
  }

  const { anrede, vorname, nachname, email, telefon, nachricht } = result.data;

  const submission = {
    id: crypto.randomUUID(),
    anrede,
    vorname,
    nachname,
    email,
    telefon: telefon || "",
    nachricht,
    createdAt: new Date().toISOString(),
    read: false,
  };

  await appendContactSubmission(submission);

  await Promise.all([
    sendNotificationEmail(
      `Neue Kontaktanfrage von ${vorname} ${nachname}`,
      `<h2>Neue Kontaktanfrage</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Anrede</td><td style="padding:8px;border:1px solid #ddd">${anrede}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${vorname} ${nachname}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-Mail</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${telefon || "–"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nachricht</td><td style="padding:8px;border:1px solid #ddd">${nachricht}</td></tr>
      </table>`
    ),
    sendAutoReply(email, `${anrede} ${vorname} ${nachname}`),
  ]);

  return { success: true };
}
