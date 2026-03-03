import { z } from "zod/v4";

export const rechnerStep1Schema = z.object({
  gebaeudetyp: z.string().min(1, "Bitte wählen Sie einen Gebäudetyp"),
  eigentuemer: z.string().min(1, "Bitte wählen Sie eine Option"),
});

export const rechnerStep2Schema = z.object({
  baujahr: z.string().min(1, "Bitte wählen Sie das Baujahr"),
  wohnflaeche: z.string().min(1, "Bitte wählen Sie die Wohnfläche"),
  daemmung: z.string().min(1, "Bitte wählen Sie den Dämmzustand"),
  fenster: z.string().min(1, "Bitte wählen Sie die Fensterart"),
});

export const rechnerStep3Schema = z.object({
  aktuelleHeizung: z.string().min(1, "Bitte wählen Sie Ihre aktuelle Heizung"),
  heizungsalter: z.string().min(1, "Bitte wählen Sie das Alter"),
  warmwasser: z.string().min(1, "Bitte wählen Sie die Warmwasserbereitung"),
});

export const rechnerStep4Schema = z.object({
  interesse: z.string().min(1, "Bitte wählen Sie Ihr Interesse"),
  waermepumpentyp: z.string().optional(),
  speicher: z.string().optional(),
  photovoltaik: z.string().optional(),
  zeitrahmen: z.string().min(1, "Bitte wählen Sie den Zeitrahmen"),
});

export const rechnerStep5Schema = z.object({
  anrede: z.string().min(1, "Bitte wählen Sie eine Anrede"),
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein"),
  strasse: z.string().min(3, "Bitte geben Sie Ihre Straße ein"),
  plz: z.string().regex(/^\d{5}$/, "Bitte geben Sie eine gültige PLZ ein"),
  ort: z.string().min(2, "Bitte geben Sie Ihren Ort ein"),
  nachricht: z.string().optional(),
  datenschutz: z.literal(true, {
    error: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
});

export const rechnerFullSchema = rechnerStep1Schema
  .merge(rechnerStep2Schema)
  .merge(rechnerStep3Schema)
  .merge(rechnerStep4Schema)
  .merge(rechnerStep5Schema);

export const contactFormSchema = z.object({
  anrede: z.string().min(1, "Bitte wählen Sie eine Anrede"),
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein"),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().optional(),
  nachricht: z.string().min(10, "Bitte geben Sie eine Nachricht ein (min. 10 Zeichen)"),
  datenschutz: z.literal(true, {
    error: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
});

export type RechnerStep1 = z.infer<typeof rechnerStep1Schema>;
export type RechnerStep2 = z.infer<typeof rechnerStep2Schema>;
export type RechnerStep3 = z.infer<typeof rechnerStep3Schema>;
export type RechnerStep4 = z.infer<typeof rechnerStep4Schema>;
export type RechnerStep5 = z.infer<typeof rechnerStep5Schema>;
export type RechnerFull = z.infer<typeof rechnerFullSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;

export const partnerFormSchema = z.object({
  firmenname: z.string().min(2, "Bitte geben Sie den Firmennamen ein"),
  ansprechpartner: z.string().min(2, "Bitte geben Sie einen Ansprechpartner ein"),
  email: z.email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z.string().optional(),
  website: z.string().optional(),
  branche: z.string().min(1, "Bitte wählen Sie eine Branche"),
  region: z.string().min(2, "Bitte geben Sie Ihre Region ein"),
  nachricht: z.string().min(10, "Bitte geben Sie eine Nachricht ein (min. 10 Zeichen)"),
  datenschutz: z.literal(true, {
    error: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
});

export type PartnerForm = z.infer<typeof partnerFormSchema>;
