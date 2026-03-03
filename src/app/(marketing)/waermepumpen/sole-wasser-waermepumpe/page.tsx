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
  title: "Sole-Wasser-Wärmepumpe — Höchste Effizienz mit Erdwärme",
  description:
    "Sole-Wasser-Wärmepumpe (Erdwärmepumpe) von CEP Energie: Höchste Effizienz, konstante Leistung, bis zu 70% Förderung. Nutzung der Erdwärme.",
};

const defaultFaq = [
  { question: "Wie tief müssen die Erdsonden gebohrt werden?", answer: "Die Tiefe der Erdsonden hängt vom Wärmebedarf und der Bodenbeschaffenheit ab. Typisch sind 80–100 Meter pro Sonde. Für ein Einfamilienhaus werden meist 1–2 Sonden benötigt." },
  { question: "Was ist der Unterschied zwischen Sonden und Kollektoren?", answer: "Erdsonden werden vertikal in die Tiefe gebohrt (80–100m) und benötigen wenig Platz. Flächenkollektoren werden horizontal in 1,2–1,5m Tiefe verlegt und benötigen eine Fläche von ca. dem 1,5-fachen der beheizten Wohnfläche." },
  { question: "Brauche ich eine Genehmigung?", answer: "Für Erdsonden ist in der Regel eine wasserrechtliche Genehmigung erforderlich. Flächenkollektoren sind meist genehmigungsfrei. Wir kümmern uns um alle notwendigen Genehmigungen." },
  { question: "Kann ich im Sommer damit kühlen?", answer: "Ja! Über die Erdwärme-Sonden kann im Sommer passive Kühlung (Natural Cooling) realisiert werden — nahezu kostenlos und ohne zusätzliche Klimaanlage." },
];

function collectItems(t: (s: string, f: string, fb: string) => string, section: string, prefix: string, fallbacks: string[]): string[] {
  return fallbacks.map((fb, i) => t(section, `${prefix}${i + 1}`, fb));
}

export default async function SoleWasserPage() {
  const [servicesData, pageContent] = await Promise.all([
    getServices(),
    getPageContent("sole-wasser-waermepumpe"),
  ]);

  const type = servicesData.waermepumpenTypes.find((t) => t.slug === "sole-wasser-waermepumpe") ?? servicesData.waermepumpenTypes[1];
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
          { label: "Sole-Wasser-Wärmepumpe" },
        ]}
      />

      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">[SOLE-WASSER]</span>
              <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                Sole-Wasser-Wärmepumpe
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
                alt="Sole-Wasser-Wärmepumpe mit Erdsondenbohrung"
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
          { icon: "cop", label: t("keyFacts", "fact1Label", "COP (Effizienz)"), value: t("keyFacts", "fact1Value", "4,0 – 5,0") },
          { icon: "cost", label: t("keyFacts", "fact2Label", "Investitionskosten"), value: t("keyFacts", "fact2Value", "20.000 – 35.000 €") },
          { icon: "operating", label: t("keyFacts", "fact3Label", "Betriebskosten/Jahr"), value: t("keyFacts", "fact3Value", "600 – 900 €") },
          { icon: "permit", label: t("keyFacts", "fact4Label", "Genehmigung"), value: t("keyFacts", "fact4Value", "Teils erforderlich") },
          { icon: "ideal", label: t("keyFacts", "fact5Label", "Ideal für"), value: t("keyFacts", "fact5Value", "Neubau mit Grundstück") },
          { icon: "time", label: t("keyFacts", "fact6Label", "Installationszeit"), value: t("keyFacts", "fact6Value", "3 – 5 Tage") },
        ]}
      />

      {/* Advantages */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Sole-Wasser-Wärmepumpe")} tag="VORTEILE" />
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
          "Höchste Effizienz unter den gängigen WP-Typen (COP 4–5)",
          "Konstante Leistung unabhängig von der Außentemperatur",
          "Passive Kühlung im Sommer (Natural Cooling) fast kostenlos",
          "Sehr leiser Betrieb — kein Außengerät nötig",
          "Niedrigste Betriebskosten aller WP-Systeme",
          "Langlebig: Erdsonden halten 50+ Jahre",
        ])}
        cons={collectItems(t, "proscons", "con", [
          "Höhere Anschaffungskosten durch Erdarbeiten",
          "Genehmigung für Tiefenbohrung erforderlich",
          "Nicht auf jedem Grundstück realisierbar",
          "Flächenkollektoren benötigen große unbebaute Fläche",
        ])}
      />

      {/* Funktionsweise */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("function", "title", "Funktionsweise")}
            subtitle={t("function", "subtitle", "So nutzt eine Sole-Wasser-Wärmepumpe die Erdwärme.")}
            tag="TECHNIK"
          />
          <div className="mb-12 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t("function", "image", "/images/wp-system-diagram.jpg")}
              alt="Systemdarstellung einer Sole-Wasser-Wärmepumpe mit Erdsonden"
              className="rounded-2xl shadow-md max-h-96 w-auto object-contain"
            />
          </div>
        </Container>
      </section>

      {/* Erdsonden vs Kollektoren */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("comparison", "title", "Erdsonden vs. Flächenkollektoren")} tag="VERGLEICH" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardTitle>{t("comparison", "sondenTitle", "Erdsonden (Tiefenbohrung)")}</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Geringer Platzbedarf</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Konstant hohe Effizienz</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Ideal für kleine Grundstücke</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Höhere Anfangsinvestition</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Genehmigung erforderlich</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>{t("comparison", "kollektorenTitle", "Flächenkollektoren")}</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Günstigere Installation</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Keine Genehmigung nötig</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Einfache Verlegung</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Große Grundstücksfläche nötig</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Fläche darf nicht überbaut werden</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Costs & Economics */}
      <CostsEconomics
        costBreakdown={{
          device: t("costs", "device", "10.000 – 15.000 €"),
          installation: t("costs", "installation", "3.000 – 5.000 €"),
          extras: t("costs", "extras", "6.000 – 15.000 €"),
          extrasLabel: t("costs", "extrasLabel", "Erdarbeiten (Sonden/Kollektoren)"),
          total: t("costs", "total", "20.000 – 35.000 €"),
        }}
        foerderung={{
          bpiRate: t("costs", "bpiRate", "30 %"),
          klimaBonus: t("costs", "klimaBonus", "+ 20 %"),
          einkommensBonus: t("costs", "einkommensBonus", "+ 30 %"),
          maxRate: t("costs", "maxRate", "bis 70 %"),
          exampleSavings: t("costs", "exampleSavings", "Bei 30.000 € Invest → ab 9.000 € Eigenanteil"),
        }}
        operating={{
          stromCostYear: t("costs", "stromCostYear", "600 – 900 €"),
          formula: t("costs", "formula", "20.000 kWh ÷ COP 4,5 × 0,30 €/kWh ≈ 4.444 kWh × 0,30 € ≈ 1.333 € (ohne PV)"),
        }}
        amortization={t("costs", "amortization", "10 – 15 Jahre (ohne Förderung), 5 – 8 Jahre (mit Förderung)")}
      />

      {/* PV Synergy */}
      <PVSynergySection
        eigenverbrauchBoost={t("pvSynergy", "eigenverbrauchBoost", "bis zu 40 %")}
        savingsExample={t("pvSynergy", "savingsExample", "Erdwärme + PV: Betriebskosten sinken auf ca. 300–500 €/Jahr — fast autark heizen.")}
      />

      {/* Installation */}
      <InstallationProcess
        duration={t("installation", "duration", "3 – 5 Tage (zzgl. Genehmigungsverfahren)")}
        steps={[
          { step: 1, title: t("installation", "step1Title", "Beratung & Standortanalyse"), description: t("installation", "step1Desc", "Geologische Prüfung, Heizlastberechnung und Machbarkeitsanalyse.") },
          { step: 2, title: t("installation", "step2Title", "Genehmigung einholen"), description: t("installation", "step2Desc", "Wasserrechtliche Genehmigung bei der Unteren Wasserbehörde beantragen.") },
          { step: 3, title: t("installation", "step3Title", "Förderantrag stellen"), description: t("installation", "step3Desc", "BAFA/KfW-Antrag einreichen — vor Baubeginn zwingend erforderlich.") },
          { step: 4, title: t("installation", "step4Title", "Erdarbeiten"), description: t("installation", "step4Desc", "Tiefenbohrung (80–100m) oder Verlegung der Flächenkollektoren.") },
          { step: 5, title: t("installation", "step5Title", "Solekreislauf installieren"), description: t("installation", "step5Desc", "Rohrleitungen verlegen und mit Sole (Wasser-Glykol-Gemisch) befüllen.") },
          { step: 6, title: t("installation", "step6Title", "Wärmepumpe aufstellen"), description: t("installation", "step6Desc", "Innengerät installieren und an den Solekreislauf anschließen.") },
          { step: 7, title: t("installation", "step7Title", "Hydraulische Anbindung"), description: t("installation", "step7Desc", "Verbindung zum Heizsystem, Pufferspeicher und Warmwasser.") },
          { step: 8, title: t("installation", "step8Title", "Inbetriebnahme & Einweisung"), description: t("installation", "step8Desc", "Druckprüfung, Systemtest und Einweisung in die Bedienung.") },
        ]}
      />

      {/* Suitability Check */}
      <SuitabilityCheck
        title={t("suitability", "title", "Ist eine Sole-Wasser-Wärmepumpe das Richtige für Sie?")}
        idealItems={collectItems(t, "suitability", "ideal", [
          "Sie planen einen Neubau mit ausreichend Grundstücksfläche",
          "Maximale Effizienz und niedrigste Betriebskosten sind Ihnen wichtig",
          "Sie möchten im Sommer passiv kühlen (Natural Cooling)",
          "Langfristige Investition mit 50+ Jahren Lebensdauer der Sonden",
          "Schallschutz ist kritisch — kein Außengerät nötig",
        ])}
        considerations={collectItems(t, "suitability", "consideration", [
          "Höhere Anfangsinvestition als bei Luft-Wasser-WP",
          "Genehmigungsverfahren kann mehrere Wochen dauern",
          "Nicht überall geologisch möglich (Bohrtiefenbeschränkung)",
          "Flächenkollektoren: Gartenfläche darf nicht überbaut werden",
        ])}
        conclusion={t("suitability", "conclusion", "Die Sole-Wasser-Wärmepumpe bietet die höchste Effizienz und niedrigsten Betriebskosten — die ideale Wahl für Neubauten mit Grundstück.")}
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

      <WPTypeCrossLinks currentSlug="sole-wasser-waermepumpe" />

      <CTABanner />
    </>
  );
}
