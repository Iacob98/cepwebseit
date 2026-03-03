"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/admin/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">CEP Admin</h1>
          <p className="mt-2 text-sm text-gray-600">Melden Sie sich an, um fortzufahren</p>
        </div>

        <form action={formAction} className="space-y-4">
          <Input
            name="password"
            type="password"
            label="Passwort"
            autoComplete="current-password"
            required
            placeholder="Admin-Passwort eingeben"
            error={state?.error}
          />

          <Button type="submit" disabled={pending} className="w-full">
            {pending ? "Wird angemeldet..." : "Anmelden"}
          </Button>
        </form>
      </div>
    </div>
  );
}
