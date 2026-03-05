"use client";

import type { CompanyData } from "@/types";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

interface MobileBottomBarProps {
  company: CompanyData;
}

export function MobileBottomBar({ company }: MobileBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background p-2 lg:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${company.phone}`}
          onClick={() => trackPhoneClick("mobile_bottom_bar")}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-white py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Anrufen
        </a>
        <a
          href="/energie-rechner"
          onClick={() => trackCTAClick({ cta_text: "Angebot erhalten", cta_location: "mobile_bottom_bar", cta_destination: "/energie-rechner" })}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Angebot erhalten
        </a>
      </div>
    </div>
  );
}
