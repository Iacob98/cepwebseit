/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

function push(event: string, params?: Record<string, any>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// --- Consent Mode v2 ---

export function initConsentDefaults() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "consent_default",
    "gtag.consent": {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    },
  });

  // Sync with previous consent if exists
  const stored = localStorage.getItem("cookie-consent");
  if (stored === "accepted") {
    updateConsent(true);
  }
}

export function updateConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const state = accepted ? "granted" : "denied";
  window.dataLayer.push({
    event: "consent_update",
    consent_accepted: accepted,
    "gtag.consent": {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    },
  });
}

// --- Form tracking ---

interface FormEventParams {
  form_name: string;
  form_step?: number;
  form_step_name?: string;
}

export function trackFormStart(params: FormEventParams) {
  push("form_start", params);
}

export function trackFormSubmit(params: FormEventParams) {
  push("form_submit", params);
}

export function trackFormComplete(params: Pick<FormEventParams, "form_name">) {
  push("form_complete", params);
}

// --- Rechner funnel ---

export function trackRechnerStepView(step: number, stepName: string) {
  push("rechner_step_view", {
    form_name: "rechner",
    form_step: step,
    form_step_name: stepName,
  });
}

export function trackRechnerStepComplete(step: number, stepName: string) {
  push("rechner_step_complete", {
    form_name: "rechner",
    form_step: step,
    form_step_name: stepName,
  });
}

// --- CTA tracking ---

interface CTAClickParams {
  cta_text: string;
  cta_location: string;
  cta_destination: string;
}

export function trackCTAClick(params: CTAClickParams) {
  push("cta_click", params);
}

export function trackPhoneClick(location: string) {
  push("phone_click", { click_location: location });
}

export function trackWhatsAppClick() {
  push("whatsapp_click");
}
