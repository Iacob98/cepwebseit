"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  interesseOptionen,
  waermepumpenTypOptionen,
  speicherOptionen,
  photovoltaikOptionen,
  zeitrahmenOptionen,
} from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep4({ data, errors, updateField }: StepProps) {
  const showWPType = data.interesse === "waermepumpe" || data.interesse === "kombi" || data.interesse === "beratung";
  const showSpeicher = data.interesse === "speicher" || data.interesse === "kombi" || data.interesse === "beratung";
  const showPV = data.interesse === "photovoltaik" || data.interesse === "kombi" || data.interesse === "beratung";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ihre Wünsche</h2>
        <p className="mt-1 text-muted-foreground">
          Was interessiert Sie? Wir erstellen Ihnen ein passendes Angebot.
        </p>
      </div>
      <RadioGroup
        name="interesse"
        label="Was interessiert Sie?"
        options={interesseOptionen}
        value={data.interesse}
        onChange={(v) => updateField("interesse", v)}
        error={errors.interesse}
        columns={2}
      />
      {showWPType && (
        <RadioGroup
          name="waermepumpentyp"
          label="Gewünschter Wärmepumpentyp"
          options={waermepumpenTypOptionen}
          value={data.waermepumpentyp}
          onChange={(v) => updateField("waermepumpentyp", v)}
          error={errors.waermepumpentyp}
          columns={2}
        />
      )}
      {showSpeicher && (
        <RadioGroup
          name="speicher"
          label="Energiespeicher"
          options={speicherOptionen}
          value={data.speicher}
          onChange={(v) => updateField("speicher", v)}
          error={errors.speicher}
          columns={2}
        />
      )}
      {showPV && (
        <RadioGroup
          name="photovoltaik"
          label="Interesse an Photovoltaik"
          options={photovoltaikOptionen}
          value={data.photovoltaik}
          onChange={(v) => updateField("photovoltaik", v)}
          error={errors.photovoltaik}
          columns={2}
        />
      )}
      <RadioGroup
        name="zeitrahmen"
        label="Zeitrahmen"
        options={zeitrahmenOptionen}
        value={data.zeitrahmen}
        onChange={(v) => updateField("zeitrahmen", v)}
        error={errors.zeitrahmen}
        columns={3}
      />
    </div>
  );
}
