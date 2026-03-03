"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  className?: string;
}

function Checkbox({ name, label, checked, onChange, error, className }: CheckboxProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-start gap-3">
        <CheckboxPrimitive.Root
          id={name}
          name={name}
          checked={checked}
          onCheckedChange={(v) => onChange(v === true)}
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 rounded border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            checked ? "border-primary bg-primary" : "border-border",
          )}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-primary-foreground">
            <Check className="h-3 w-3" strokeWidth={3} />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label htmlFor={name} className="text-sm text-muted-foreground cursor-pointer">
          {label}
        </label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { Checkbox };
