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
import { HeatingCostChart } from "@/components/shared/HeatingCostChart";
import { KeyFactsSummary } from "@/components/sections/waermepumpen/KeyFactsSummary";
import { ProsConsSection } from "@/components/sections/waermepumpen/ProsConsSection";
import { CostsEconomics } from "@/components/sections/waermepumpen/CostsEconomics";
import { PVSynergySection } from "@/components/sections/waermepumpen/PVSynergySection";
import { InstallationProcess } from "@/components/sections/waermepumpen/InstallationProcess";
import { SuitabilityCheck } from "@/components/sections/waermepumpen/SuitabilityCheck";
import { getServices, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Luft-Wasser-Wärmepumpe — Die beliebte Lösung",
  description:
    "Luft-Wasser-Wärmepumpe von CEP Energie: Einfache Installation, geringe Kosten, bis zu 70% Förderung. Die beliebteste Wärmepumpenart für Ihr Zuhause.",
};

const defaultFaq = [
  { question: "Wie laut ist eine Luft-Wasser-Wärmepumpe?", answer: "Moderne Luft-Wasser-Wärmepumpen erreichen Schallpegel von 35–50 dB(A) im Normalbetrieb. Das ist vergleichbar mit einem leisen Gespräch. Durch richtige Aufstellung und Schallschutzmaßnahmen lässt sich die Geräuschentwicklung weiter reduzieren." },
  { question: "Funktioniert eine Luft-Wasser-Wärmepumpe auch im Winter?", answer: "Ja! Moderne Geräte arbeiten effizient bis -20°C Außentemperatur. Bei sehr niedrigen Temperaturen sinkt die Effizienz etwas, aber die Heizleistung bleibt gewährleistet." },
  { question: "Wo wird das Außengerät aufgestellt?", answer: "Das Außengerät benötigt einen gut belüfteten Standort im Freien. Idealerweise wird es an einer wind- und lärmgeschützten Stelle aufgestellt, mit ausreichend Abstand zu Nachbargebäuden." },
  { question: "Wie hoch sind die Betriebskosten?", answer: "Für ein durchschnittliches Einfamilienhaus liegen die jährlichen Stromkosten bei ca. 800–1.200 Euro. In Kombination mit Photovoltaik können die Kosten deutlich gesenkt werden." },
];

/** Collect numbered fields like pro1, pro2, ... into an array */
function collectItems(t: (s: string, f: string, fb: string) => string, section: string, prefix: string, fallbacks: string[]): string[] {
  return fallbacks.map((fb, i) => t(section, `${prefix}${i + 1}`, fb));
}

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
      label: "Bis 75%*",
      sublabel: "Heizkosten sparen",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: "Bis 70%*",
      sublabel: "Staatliche Förderung",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "20+ Jahre*",
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

      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">[LUFT-WASSER]</span>
              <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                Luft-Wasser-Wärmepumpe
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">{type.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-4 py-2 text-sm font-semibold text-primary">
                COP: {type.cop} &middot; Ideal für: {type.idealFor}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/energie-rechner" size="lg">Kosten berechnen</Button>
                <Button href="/kontakt" variant="outline" size="lg">Beratung anfragen</Button>
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t("hero", "image", "/images/wp-outdoor.jpg")}
                alt="Luft-Wasser-Wärmepumpe Außengerät"
                className="rounded-2xl shadow-sm object-cover w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-8">
        <Container><TrustBadges items={wpBadges} /></Container>
      </section>

      {/* Key Facts */}
      <KeyFactsSummary
        facts={[
          { icon: "cop", label: t("keyFacts", "fact1Label", "COP (Effizienz)"), value: t("keyFacts", "fact1Value", "3,0 – 4,5") },
          { icon: "cost", label: t("keyFacts", "fact2Label", "Investitionskosten"), value: t("keyFacts", "fact2Value", "15.000 – 25.000 €") },
          { icon: "operating", label: t("keyFacts", "fact3Label", "Betriebskosten/Jahr"), value: t("keyFacts", "fact3Value", "800 – 1.200 €") },
          { icon: "permit", label: t("keyFacts", "fact4Label", "Genehmigung"), value: t("keyFacts", "fact4Value", "Nicht erforderlich") },
          { icon: "ideal", label: t("keyFacts", "fact5Label", "Ideal für"), value: t("keyFacts", "fact5Value", "Bestand & Neubau") },
          { icon: "time", label: t("keyFacts", "fact6Label", "Installationszeit"), value: t("keyFacts", "fact6Value", "1 – 2 Tage") },
        ]}
      />

      {/* Advantages */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Luft-Wasser-Wärmepumpe")} tag="VORTEILE" />
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

      {/* Pros & Cons */}
      <ProsConsSection
        pros={collectItems(t, "proscons", "pro", [
          "Niedrigste Anschaffungskosten aller WP-Typen",
          "Keine Erdarbeiten oder Bohrungen nötig",
          "Schnelle Installation in 1–2 Tagen",
          "Ideal für Bestandsgebäude und Sanierung",
          "Keine Genehmigung erforderlich",
          "Kombination mit PV-Anlage einfach möglich",
        ])}
        cons={collectItems(t, "proscons", "con", [
          "Geringerer COP als Sole- oder Wasser-WP",
          "Effizienz sinkt bei sehr tiefen Außentemperaturen",
          "Außengerät verursacht Betriebsgeräusche (35–50 dB)",
          "Höhere Stromkosten als erdgekoppelte Systeme",
        ])}
      />

      {/* Funktionsweise */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("function", "title", "Funktionsweise")} subtitle={t("function", "subtitle", "So funktioniert eine Luft-Wasser-Wärmepumpe.")} tag="TECHNIK" />
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

      {/* Costs & Economics */}
      <CostsEconomics
        costBreakdown={{
          device: t("costs", "device", "8.000 – 16.000 €"),
          installation: t("costs", "installation", "4.000 – 6.000 €"),
          extras: t("costs", "extras", "1.000 – 3.000 €"),
          extrasLabel: t("costs", "extrasLabel", "Zubehör & Anpassungen"),
          total: t("costs", "total", "15.000 – 25.000 €"),
        }}
        foerderung={{
          bpiRate: t("costs", "bpiRate", "30 %"),
          klimaBonus: t("costs", "klimaBonus", "+ 20 %"),
          einkommensBonus: t("costs", "einkommensBonus", "+ 30 %"),
          maxRate: t("costs", "maxRate", "bis 70 %"),
          exampleSavings: t("costs", "exampleSavings", "Bei 20.000 € Invest → ab 6.000 € Eigenanteil"),
        }}
        operating={{
          stromCostYear: t("costs", "stromCostYear", "800 – 1.200 €"),
          formula: t("costs", "formula", "20.000 kWh ÷ COP 3,5 × 0,30 €/kWh ≈ 1.700 kWh × 0,30 € ≈ 510 € (Neubau)"),
        }}
        amortization={t("costs", "amortization", "8 – 12 Jahre (ohne Förderung), 4 – 7 Jahre (mit Förderung)")}
      />

      {/* PV Synergy */}
      <PVSynergySection
        eigenverbrauchBoost={t("pvSynergy", "eigenverbrauchBoost", "bis zu 30 %")}
        savingsExample={t("pvSynergy", "savingsExample", "Mit PV-Strom sinken die WP-Betriebskosten um bis zu 50 % — auf ca. 400–600 €/Jahr.")}
      />

      {/* Installation */}
      <InstallationProcess
        duration={t("installation", "duration", "1 – 2 Tage")}
        steps={[
          { step: 1, title: t("installation", "step1Title", "Beratung & Planung"), description: t("installation", "step1Desc", "Vor-Ort-Besichtigung, Heizlastberechnung und Angebotserstellung.") },
          { step: 2, title: t("installation", "step2Title", "Förderantrag"), description: t("installation", "step2Desc", "Wir stellen den BAFA/KfW-Antrag für Sie — vor Baubeginn.") },
          { step: 3, title: t("installation", "step3Title", "Fundament & Aufstellung"), description: t("installation", "step3Desc", "Außengerät auf Betonfundament oder Schwingungsdämpfer aufstellen.") },
          { step: 4, title: t("installation", "step4Title", "Hydraulische Anbindung"), description: t("installation", "step4Desc", "Verbindung zum Heizsystem, Pufferspeicher und Warmwasser.") },
          { step: 5, title: t("installation", "step5Title", "Inbetriebnahme & Einweisung"), description: t("installation", "step5Desc", "Systemtest, Optimierung der Heizkurve und Einweisung in die Bedienung.") },
        ]}
      />

      {/* Suitability Check */}
      <SuitabilityCheck
        title={t("suitability", "title", "Ist eine Luft-Wasser-Wärmepumpe das Richtige für Sie?")}
        idealItems={collectItems(t, "suitability", "ideal", [
          "Sie sanieren ein Bestandsgebäude oder bauen neu",
          "Ihr Budget für die Heizung ist begrenzt",
          "Keine Erdarbeiten auf Ihrem Grundstück möglich",
          "Sie möchten eine schnelle, unkomplizierte Installation",
          "Kombination mit einer PV-Anlage ist geplant",
        ])}
        considerations={collectItems(t, "suitability", "consideration", [
          "Schallschutzanforderungen der Nachbarn beachten",
          "Effizienz bei extremer Kälte (< -15°C) etwas geringer",
          "Stromkosten höher als bei Erdwärme-Systemen",
          "Außengerät benötigt geeigneten Aufstellort",
        ])}
        conclusion={t("suitability", "conclusion", "Die Luft-Wasser-Wärmepumpe ist die beliebteste und vielseitigste Lösung — ideal für die meisten Einfamilienhäuser in Deutschland.")}
      />

      {/* Heating Cost Chart */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title={t("charts", "title", "Heizkosten im Vergleich")}
            subtitle={t("charts", "subtitle", "Wärmepumpe vs. konventionelle Heizsysteme — jährliche Kosten im Überblick.")}
            tag="KOSTEN"
          />
          <div className="max-w-2xl mx-auto">
            <HeatingCostChart />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen" tag="FAQ" />
          <FAQAccordion items={defaultFaq} />
        </Container>
      </section>

      <FoerderungServiceCallout />

      <WPTypeCrossLinks currentSlug="luft-wasser-waermepumpe" />

      <CTABanner />
    </>
  );
}
