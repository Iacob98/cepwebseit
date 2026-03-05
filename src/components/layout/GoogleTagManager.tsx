"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { initConsentDefaults } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    initConsentDefaults();

    if (!GTM_ID) return;

    const check = () => {
      setEnabled(localStorage.getItem("cookie-consent") === "accepted");
    };

    check();

    const onConsentUpdate = () => check();
    window.addEventListener("cookie-consent-update", onConsentUpdate);
    window.addEventListener("storage", onConsentUpdate);

    return () => {
      window.removeEventListener("cookie-consent-update", onConsentUpdate);
      window.removeEventListener("storage", onConsentUpdate);
    };
  }, []);

  if (!GTM_ID || !enabled) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
