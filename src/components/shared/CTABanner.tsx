"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { trackCTAClick } from "@/lib/analytics";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  image?: string;
}

export function CTABanner({
  title = "Bereit für Ihre Energiewende?",
  description = "Lassen Sie sich kostenlos und unverbindlich beraten. Wir finden die optimale Lösung für Ihr Zuhause.",
  primaryHref = "/energie-rechner",
  primaryLabel = "Jetzt kostenlos berechnen",
  secondaryHref = "/kontakt",
  secondaryLabel = "Kontakt aufnehmen",
  image = "/images/pv-roof-close.jpg",
}: CTABannerProps) {
  return (
    <section className="relative bg-gray-900 py-16 overflow-hidden">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <Container className="relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={primaryHref}
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
              onClick={() => trackCTAClick({ cta_text: primaryLabel, cta_location: "cta_banner", cta_destination: primaryHref })}
            >
              {primaryLabel}
            </Button>
            <Button
              href={secondaryHref}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => trackCTAClick({ cta_text: secondaryLabel, cta_location: "cta_banner", cta_destination: secondaryHref })}
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
