import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges, type TrustBadgeItem } from "@/components/shared/TrustBadges";
import { WPTypeCrossLinks } from "@/components/shared/WPTypeCrossLinks";
import { FoerderungServiceCallout } from "@/components/shared/FoerderungServiceCallout";
import { getServices, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Luft-Wasser-Wärmepumpe — Die beliebte Lösung",
  description:
    "Luft-Wasser-Wärmepumpe von Arvernus: Einfache Installation, geringe Kosten, bis zu 70% Förderung. Die beliebteste Wärmepumpenart für Ihr Zuhause.",
};

const defaultFaq = [
  { question: "Wie laut ist eine Luft-Wasser-Wärmepumpe?", answer: "Moderne Luft-Wasser-Wärmepumpen erreichen Schallpegel von 35–50 dB(A) im Normalbetrieb. Das ist vergleichbar mit einem leisen Gespräch. Durch richtige Aufstellung und Schallschutzmaßnahmen lässt sich die Geräuschentwicklung weiter reduzieren." },
  { question: "Funktioniert eine Luft-Wasser-Wärmepumpe auch im Winter?", answer: "Ja! Moderne Geräte arbeiten effizient bis -20°C Außentemperatur. Bei sehr niedrigen Temperaturen sinkt die Effizienz etwas, aber die Heizleistung bleibt gewährleistet." },
  { question: "Wo wird das Außengerät aufgestellt?", answer: "Das Außengerät benötigt einen gut belüfteten Standort im Freien. Idealerweise wird es an einer wind- und lärmgeschützten Stelle aufgestellt, mit ausreichend Abstand zu Nachbargebäuden." },
  { question: "Wie hoch sind die Betriebskosten?", answer: "Für ein durchschnittliches Einfamilienhaus liegen die jährlichen Stromkosten bei ca. 800–1.200 Euro. In Kombination mit Photovoltaik können die Kosten deutlich gesenkt werden." },
];

export default async function LuftWasserPage() {
  const [servicesData, pageContent] = await Promise.all([
    getServices(),
    getPageContent("luft-wasser-waermepumpe"),
  ]);

  const type = servicesData.waermepumpenTypes.find((t) => t.slug === "luft-wasser-waermepumpe") ?? servicesData.waermepumpenTypes[0];
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const wpBadges: TrustBadgeItem[] = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Bis 75%",
      sublabel: "Heizkosten sparen",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: "Bis 70%",
      sublabel: "Staatliche Förderung",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "20+ Jahre",
      sublabel: "Lebensdauer",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Zertifiziert",
      sublabel: "Qualifizierter Fachbetrieb",
    },
  ];

  return (
    <>
      <BreadcrumbNav
        items={[
          { label: "Wärmepumpen", href: "/waermepumpen" },
          { label: "Luft-Wasser-Wärmepumpe" },
        ]}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Luft-Wasser-Wärmepumpe
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">{type.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
                COP: {type.cop} &middot; Ideal für: {type.idealFor}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/waermepumpen-rechner" size="lg">Kosten berechnen</Button>
                <Button href="/kontakt" variant="outline" size="lg">Beratung anfragen</Button>
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t("hero", "image", "/images/wp-outdoor.jpg")}
                alt="Luft-Wasser-Wärmepumpe Außengerät"
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 border-b border-border">
        <Container><TrustBadges items={wpBadges} /></Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Luft-Wasser-Wärmepumpe")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {type.advantages.map((adv) => (
              <Card key={adv}>
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-foreground">{adv}</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("function", "title", "Funktionsweise")} subtitle={t("function", "subtitle", "So funktioniert eine Luft-Wasser-Wärmepumpe.")} />
          <div className="mb-12 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t("function", "image", "/images/wp-system-diagram.jpg")}
              alt="Systemdarstellung einer Wärmepumpenanlage im Einfamilienhaus"
              className="rounded-2xl shadow-md max-h-96 w-auto object-contain"
            />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { step: "1", title: t("function", "step1Title", "Wärmeaufnahme"), desc: t("function", "step1Desc", "Ein Ventilator saugt Außenluft an. Das Kältemittel im Verdampfer nimmt die Wärme der Luft auf.") },
                { step: "2", title: t("function", "step2Title", "Verdichtung"), desc: t("function", "step2Desc", "Der Kompressor verdichtet das gasförmige Kältemittel und erhöht dadurch die Temperatur.") },
                { step: "3", title: t("function", "step3Title", "Wärmeabgabe"), desc: t("function", "step3Desc", "Im Kondensator gibt das heiße Kältemittel seine Wärme an das Heizsystem ab.") },
                { step: "4", title: t("function", "step4Title", "Entspannung"), desc: t("function", "step4Desc", "Das Expansionsventil senkt den Druck, das Kältemittel kühlt ab — der Kreislauf beginnt erneut.") },
              ].map((item) => (
                <Card key={item.step}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardContent><p className="mt-1 text-sm">{item.desc}</p></CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen" />
          <FAQAccordion items={defaultFaq} />
        </Container>
      </section>

      <FoerderungServiceCallout />

      <WPTypeCrossLinks currentSlug="luft-wasser-waermepumpe" />

      <CTABanner />
    </>
  );
}
