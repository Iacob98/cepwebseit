"use client";

import { useState } from "react";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import {
  rechnerStep1Schema,
  rechnerStep2Schema,
  rechnerStep3Schema,
  rechnerStep4Schema,
  rechnerStep5Schema,
} from "@/lib/schemas";
import type { RechnerFormData } from "@/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RechnerStep1 } from "./RechnerStep1";
import { RechnerStep2 } from "./RechnerStep2";
import { RechnerStep3 } from "./RechnerStep3";
import { RechnerStep4 } from "./RechnerStep4";
import { RechnerStep5 } from "./RechnerStep5";
import { RechnerResult } from "./RechnerResult";
import { submitRechner } from "@/actions/rechner";

const schemas = [
  rechnerStep1Schema,
  rechnerStep2Schema,
  rechnerStep3Schema,
  rechnerStep4Schema,
  rechnerStep5Schema,
];

const stepTitles = [
  "Gebäudetyp",
  "Gebäudedaten",
  "Heizsystem",
  "Wünsche",
  "Kontaktdaten",
];

const initialData: RechnerFormData = {
  gebaeudetyp: "",
  eigentuemer: "",
  baujahr: "",
  wohnflaeche: "",
  daemmung: "",
  fenster: "",
  aktuelleHeizung: "",
  heizungsalter: "",
  warmwasser: "",
  interesse: "",
  waermepumpentyp: "",
  speicher: "",
  photovoltaik: "",
  zeitrahmen: "",
  anrede: "",
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  strasse: "",
  plz: "",
  ort: "",
  nachricht: "",
  datenschutz: false,
};

export function RechnerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useMultiStepForm<RechnerFormData>({
    totalSteps: 5,
    schemas,
    initialData,
  });

  const handleSubmit = async () => {
    if (!form.complete()) return;
    setIsSubmitting(true);
    try {
      await submitRechner(form.data);
    } catch {
      // Error handling
    } finally {
      setIsSubmitting(false);
    }
  };

  if (form.isCompleted) {
    return <RechnerResult />;
  }

  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Schritt {form.currentStep + 1} von 5
            </span>
            <span className="text-sm font-medium text-primary">
              {stepTitles[form.currentStep]}
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${form.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {stepTitles.map((title, i) => (
              <span
                key={title}
                className={`text-xs hidden sm:block ${
                  i <= form.currentStep ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="rounded-xl border border-border bg-background p-6 sm:p-8 shadow-sm">
          {form.currentStep === 0 && (
            <RechnerStep1 data={form.data} errors={form.errors} updateField={form.updateField} />
          )}
          {form.currentStep === 1 && (
            <RechnerStep2 data={form.data} errors={form.errors} updateField={form.updateField} />
          )}
          {form.currentStep === 2 && (
            <RechnerStep3 data={form.data} errors={form.errors} updateField={form.updateField} />
          )}
          {form.currentStep === 3 && (
            <RechnerStep4 data={form.data} errors={form.errors} updateField={form.updateField} />
          )}
          {form.currentStep === 4 && (
            <RechnerStep5 data={form.data} errors={form.errors} updateField={form.updateField} />
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={form.prevStep}
              disabled={form.currentStep === 0}
              className={form.currentStep === 0 ? "invisible" : ""}
            >
              Zurück
            </Button>
            {form.currentStep < 4 ? (
              <Button onClick={form.nextStep}>
                Weiter
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
