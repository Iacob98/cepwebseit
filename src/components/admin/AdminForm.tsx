"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";

interface AdminFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  backHref: string;
  submitLabel?: string;
  children: React.ReactNode;
}

export function AdminForm({ action, backHref, submitLabel = "Speichern", children }: AdminFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">
          Erfolgreich gespeichert!
        </div>
      )}

      {children}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <Button type="submit" disabled={pending} size="sm">
          {pending ? "Wird gespeichert..." : submitLabel}
        </Button>
        <Button variant="outline" href={backHref} size="sm" className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700 border-1">
          Abbrechen
        </Button>
      </div>
    </form>
  );
}
