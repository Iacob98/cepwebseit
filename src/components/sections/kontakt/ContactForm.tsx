"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { anredeOptionen } from "@/data/rechner-options";
import { contactFormSchema } from "@/lib/schemas";
import { submitContact } from "@/actions/contact";
import type { ContactFormData } from "@/types";

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>({
    anrede: "",
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    nachricht: "",
    datenschutz: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof ContactFormData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) fieldErrors[path] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContact(data);
      setIsSuccess(true);
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/30">
          <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">Nachricht gesendet!</h3>
        <p className="mt-2 text-muted-foreground">
          Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-background p-6 sm:p-8 shadow-sm space-y-6">
      <RadioGroup
        name="anrede"
        label="Anrede"
        options={anredeOptionen}
        value={data.anrede}
        onChange={(v) => updateField("anrede", v)}
        error={errors.anrede}
        columns={2}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Vorname *"
          name="vorname"
          value={data.vorname}
          onChange={(e) => updateField("vorname", e.target.value)}
          error={errors.vorname}
          placeholder="Max"
        />
        <Input
          label="Nachname *"
          name="nachname"
          value={data.nachname}
          onChange={(e) => updateField("nachname", e.target.value)}
          error={errors.nachname}
          placeholder="Mustermann"
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
          placeholder="max@beispiel.de"
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
      <Textarea
        label="Nachricht *"
        name="nachricht"
        value={data.nachricht}
        onChange={(e) => updateField("nachricht", e.target.value)}
        error={errors.nachricht}
        placeholder="Beschreiben Sie Ihr Anliegen..."
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
        {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
      </Button>
    </form>
  );
}
