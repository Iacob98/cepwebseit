"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 1 | 2 | 3;
}

function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  columns = 1,
}: RadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      {label && (
        <legend className="block text-sm font-medium text-foreground mb-2">
          {label}
        </legend>
      )}
      <RadioGroupPrimitive.Root
        name={name}
        value={value}
        onValueChange={onChange}
        className={cn(
          "grid gap-3",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-3 rounded-lg border-2 p-4 cursor-pointer transition-colors",
              value === option.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/30",
            )}
          >
            <RadioGroupPrimitive.Item
              value={option.value}
              className={cn(
                "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                value === option.value ? "border-primary" : "border-border",
              )}
            >
              <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <div>
              <span className="font-medium text-foreground">{option.label}</span>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </fieldset>
  );
}

export { RadioGroup };
