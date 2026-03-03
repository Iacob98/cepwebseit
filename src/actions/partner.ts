"use server";

import { partnerFormSchema } from "@/lib/schemas";
import { appendPartnerSubmission } from "@/lib/dal";
import { sendNotificationEmail } from "@/lib/email";
import type { PartnerFormData } from "@/types";

export async function submitPartnerForm(data: PartnerFormData) {
  const result = partnerFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Validierungsfehler. Bitte überprüfen Sie Ihre Angaben." };
  }

  const { firmenname, ansprechpartner, email, telefon, website, branche, region, nachricht } = result.data;

  const submission = {
    id: crypto.randomUUID(),
    firmenname,
    ansprechpartner,
    email,
    telefon: telefon || "",
    website: website || "",
    branche,
    region,
    nachricht,
    createdAt: new Date().toISOString(),
    read: false,
  };

  await appendPartnerSubmission(submission);

  await sendNotificationEmail(
    `Neue Partneranfrage von ${firmenname}`,
    `<h2>Neue Partneranfrage</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Firma</td><td style="padding:8px;border:1px solid #ddd">${firmenname}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Ansprechpartner</td><td style="padding:8px;border:1px solid #ddd">${ansprechpartner}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">E-Mail</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #ddd">${telefon || "–"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Website</td><td style="padding:8px;border:1px solid #ddd">${website || "–"}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Branche</td><td style="padding:8px;border:1px solid #ddd">${branche}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Region</td><td style="padding:8px;border:1px solid #ddd">${region}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nachricht</td><td style="padding:8px;border:1px solid #ddd">${nachricht}</td></tr>
    </table>`
  );

  return { success: true };
}
