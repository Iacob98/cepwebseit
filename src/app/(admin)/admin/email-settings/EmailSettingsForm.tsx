"use client";

import { useActionState, useState, useRef } from "react";
import type { EmailSettingsData } from "@/lib/dal-schemas";

interface Props {
  settings: EmailSettingsData;
  action: (
    state: { success?: boolean; error?: string } | null,
    formData: FormData
  ) => Promise<{ success?: boolean; error?: string }>;
}

export function EmailSettingsForm({ settings, action }: Props) {
  const [state, formAction, pending] = useActionState(action, null);

  const [subject, setSubject] = useState(settings.subject);
  const [headerTitle, setHeaderTitle] = useState(settings.headerTitle);
  const [headerSubtitle, setHeaderSubtitle] = useState(settings.headerSubtitle ?? "");
  const [greeting, setGreeting] = useState(settings.greeting);
  const [bodyText, setBodyText] = useState(settings.bodyText);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone ?? "");
  const [contactEmail, setContactEmail] = useState(settings.contactEmail ?? "");
  const [closing, setClosing] = useState(settings.closing);
  const [footerText, setFooterText] = useState(settings.footerText ?? "");
  const [headerColor, setHeaderColor] = useState(settings.headerColor);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo || null);
  const [logoRemoved, setLogoRemoved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoRemoved(false);
    }
  }

  function handleLogoRemove() {
    setLogoPreview(null);
    setLogoRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={formAction} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Left: Form Fields */}
      <div className="space-y-6">
        {state?.error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{state.error}</div>
        )}
        {state?.success && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">Einstellungen gespeichert!</div>
        )}

        {/* Subject */}
        <Field label="Betreff" name="subject" value={subject} onChange={setSubject} />

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Kopfbereich</h3>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div className="flex items-start gap-4">
              {logoPreview && (
                <div className="relative h-16 w-40 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-white p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoPreview} alt="Logo" className="h-full w-full object-contain" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="logo"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleLogoChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary-100 file:cursor-pointer cursor-pointer"
                />
                <p className="text-xs text-gray-500">JPEG, PNG oder WebP. Max 10MB.</p>
                {logoPreview && (
                  <button type="button" onClick={handleLogoRemove} className="text-xs text-red-600 hover:text-red-800">
                    Logo entfernen
                  </button>
                )}
              </div>
            </div>
            {settings.logo && !logoRemoved && (
              <input type="hidden" name="logo_current" value={settings.logo} />
            )}
            {logoRemoved && <input type="hidden" name="logo_remove" value="1" />}
          </div>

          <Field label="Titel" name="headerTitle" value={headerTitle} onChange={setHeaderTitle} />
          <Field label="Untertitel" name="headerSubtitle" value={headerSubtitle} onChange={setHeaderSubtitle} />

          {/* Color picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farbe</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="headerColor"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Inhalt</h3>
          <Field label="Begrüßung (Überschrift)" name="greeting" value={greeting} onChange={setGreeting} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nachrichtentext</label>
            <textarea
              name="bodyText"
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <Field label="Telefon" name="contactPhone" value={contactPhone} onChange={setContactPhone} />
          <Field label="E-Mail" name="contactEmail" value={contactEmail} onChange={setContactEmail} />
          <Field label="Abschluss" name="closing" value={closing} onChange={setClosing} />
        </div>

        {/* Footer */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Fußzeile</h3>
          <Field label="Fußzeilen-Text" name="footerText" value={footerText} onChange={setFooterText} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {pending ? "Wird gespeichert..." : "Speichern"}
        </button>
      </div>

      {/* Right: Live Preview */}
      <div className="xl:sticky xl:top-6 xl:self-start">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Vorschau</h3>
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-[#f4f6f8] p-6">
          <div className="max-w-[480px] mx-auto bg-white rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div style={{ backgroundColor: headerColor }} className="px-8 py-6 text-center">
              {logoPreview && (
                <div className="mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoPreview} alt="Logo" className="h-10 mx-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              )}
              <h2 className="text-white text-lg font-bold m-0">{headerTitle}</h2>
              {headerSubtitle && (
                <p className="text-white/85 text-xs mt-1 m-0">{headerSubtitle}</p>
              )}
            </div>
            {/* Body */}
            <div className="px-8 py-6">
              <h3 style={{ color: headerColor }} className="text-base font-semibold mb-3">{greeting}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">Guten Tag Max Mustermann,</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{bodyText}</p>
              {(contactPhone || contactEmail) && (
                <div className="mb-4 text-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">In der Zwischenzeit können Sie uns jederzeit erreichen:</p>
                  <table className="text-sm">
                    <tbody>
                      {contactPhone && (
                        <tr>
                          <td className="pr-3 py-1 text-gray-500">Telefon:</td>
                          <td className="py-1 font-semibold text-gray-700">{contactPhone}</td>
                        </tr>
                      )}
                      {contactEmail && (
                        <tr>
                          <td className="pr-3 py-1 text-gray-500">E-Mail:</td>
                          <td className="py-1 font-semibold text-gray-700">{contactEmail}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-gray-700 text-sm">
                Mit freundlichen Grüßen,<br />
                <strong>{closing}</strong>
              </p>
            </div>
            {/* Footer */}
            {footerText && (
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-4">
                <p className="text-gray-400 text-xs text-center m-0">{footerText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
