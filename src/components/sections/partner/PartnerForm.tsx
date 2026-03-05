"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { trackFormStart, trackFormSubmit, trackFormComplete } from "@/lib/analytics";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { partnerFormSchema } from "@/lib/schemas";
import { submitPartnerForm } from "@/actions/partner";
import type { PartnerFormData } from "@/types";

const brancheOptionen = [
  { value: "Heizungstechnik", label: "Heizungstechnik" },
  { value: "Solartechnik", label: "Solartechnik" },
  { value: "Elektrotechnik", label: "Elektrotechnik" },
  { value: "Sanitär", label: "Sanitär" },
  { value: "Dachdecker", label: "Dachdecker" },
  { value: "Energieberatung", label: "Energieberatung" },
  { value: "Sonstiges", label: "Sonstiges" },
];

export function PartnerForm() {
  const [data, setData] = useState<PartnerFormData>({
    firmenname: "",
    ansprechpartner: "",
    email: "",
    telefon: "",
    website: "",
    branche: "",
    region: "",
    nachricht: "",
    datenschutz: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const hasStarted = useRef(false);

  const handleFormInteraction = useCallback(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackFormStart({ form_name: "partner" });
    }
  }, []);

  const updateField = (field: keyof PartnerFormData, value: unknown) => {
    handleFormInteraction();
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = partnerFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    trackFormSubmit({ form_name: "partner" });
    setIsSubmitting(true);
    try {
      await submitPartnerForm(data);
      trackFormComplete({ form_name: "partner" });
      setIsSuccess(true);
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Anfrage gesendet!</h3>
        <p className="mt-2 text-muted-foreground">
          Vielen Dank für Ihr Interesse an einer Partnerschaft. Wir melden uns zeitnah bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Firmenname *"
          name="firmenname"
          value={data.firmenname}
          onChange={(e) => updateField("firmenname", e.target.value)}
          error={errors.firmenname}
          placeholder="Muster GmbH"
        />
        <Input
          label="Ansprechpartner *"
          name="ansprechpartner"
          value={data.ansprechpartner}
          onChange={(e) => updateField("ansprechpartner", e.target.value)}
          error={errors.ansprechpartner}
          placeholder="Max Mustermann"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="E-Mail *"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          placeholder="info@firma.de"
        />
        <Input
          label="Telefon"
          name="telefon"
          type="tel"
          value={data.telefon}
          onChange={(e) => updateField("telefon", e.target.value)}
          placeholder="0170 1234567"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Website"
          name="website"
          value={data.website}
          onChange={(e) => updateField("website", e.target.value)}
          placeholder="https://www.firma.de"
        />
        <Select
          label="Branche *"
          name="branche"
          value={data.branche}
          onChange={(e) => updateField("branche", e.target.value)}
          error={errors.branche}
          options={brancheOptionen}
          placeholder="Branche wählen"
        />
      </div>
      <Input
        label="Region / Einzugsgebiet *"
        name="region"
        value={data.region}
        onChange={(e) => updateField("region", e.target.value)}
        error={errors.region}
        placeholder="z.B. Rhein-Main-Gebiet, Bayern, bundesweit"
      />
      <Textarea
        label="Nachricht *"
        name="nachricht"
        value={data.nachricht}
        onChange={(e) => updateField("nachricht", e.target.value)}
        error={errors.nachricht}
        placeholder="Erzählen Sie uns, warum Sie Partner werden möchten und was Ihr Unternehmen auszeichnet..."
      />
      <Checkbox
        name="datenschutz"
        checked={data.datenschutz}
        onChange={(v) => updateField("datenschutz", v)}
        error={errors.datenschutz}
        label={
          <>
            Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
            <Link href="/datenschutz" className="text-primary hover:underline" target="_blank">
              Datenschutzerklärung
            </Link>{" "}
            zu. *
          </>
        }
      />
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Wird gesendet..." : "Partneranfrage senden"}
      </Button>
    </form>
  );
}
