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
  title: "Wasser-Wasser-Wärmepumpe — Maximale Effizienz",
  description:
    "Wasser-Wasser-Wärmepumpe von Arvernus: Höchster Wirkungsgrad aller Wärmepumpen, nutzt Grundwasser als Wärmequelle. Bis zu 70% Förderung.",
};

const defaultFaq = [
  { question: "Welche Voraussetzungen brauche ich für eine Wasser-Wasser-Wärmepumpe?", answer: "Sie benötigen zugängliches Grundwasser in ausreichender Menge und Qualität. Ein Grundwassertest prüft dies vorab. Zudem ist eine wasserrechtliche Genehmigung erforderlich." },
  { question: "Wie wird das Grundwasser genutzt?", answer: "Über einen Förderbrunnen wird Grundwasser entnommen, die Wärme im Verdampfer der Wärmepumpe entzogen, und das abgekühlte Wasser über einen Schluckbrunnen zurückgeführt." },
  { question: "Was kostet eine Wasser-Wasser-Wärmepumpe?", answer: "Die Gesamtkosten inkl. Brunnenbohrung liegen bei 20.000–40.000 Euro. Nach Abzug der Förderung (bis 70%) reduzieren sich die Kosten erheblich. Die niedrigen Betriebskosten machen sie langfristig sehr wirtschaftlich." },
  { question: "Wie effizient ist eine Wasser-Wasser-Wärmepumpe?", answer: "Mit einem COP von 5,0–6,0 ist sie die effizienteste aller Wärmepumpenarten. Das Grundwasser hat ganzjährig eine konstante Temperatur von 8–12°C, was die hohe Effizienz ermöglicht." },
];

function collectItems(t: (s: string, f: string, fb: string) => string, section: string, prefix: string, fallbacks: string[]): string[] {
  return fallbacks.map((fb, i) => t(section, `${prefix}${i + 1}`, fb));
}

export default async function WasserWasserPage() {
  const [servicesData, pageContent] = await Promise.all([
    getServices(),
    getPageContent("wasser-wasser-waermepumpe"),
  ]);

  const type = servicesData.waermepumpenTypes.find((t) => t.slug === "wasser-wasser-waermepumpe") ?? servicesData.waermepumpenTypes[2];
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
          { label: "Wasser-Wasser-Wärmepumpe" },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Wasser-Wasser-Wärmepumpe
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
                src={t("hero", "image", "/images/wp-indoor-unit.jpg")}
                alt="Wasser-Wasser-Wärmepumpe Innengerät"
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b border-border">
        <Container><TrustBadges items={wpBadges} /></Container>
      </section>

      {/* Key Facts */}
      <KeyFactsSummary
        facts={[
          { icon: "cop", label: t("keyFacts", "fact1Label", "COP (Effizienz)"), value: t("keyFacts", "fact1Value", "5,0 – 6,0") },
          { icon: "cost", label: t("keyFacts", "fact2Label", "Investitionskosten"), value: t("keyFacts", "fact2Value", "20.000 – 40.000 €") },
          { icon: "operating", label: t("keyFacts", "fact3Label", "Betriebskosten/Jahr"), value: t("keyFacts", "fact3Value", "500 – 800 €") },
          { icon: "permit", label: t("keyFacts", "fact4Label", "Genehmigung"), value: t("keyFacts", "fact4Value", "Ja (wasserrechtlich)") },
          { icon: "ideal", label: t("keyFacts", "fact5Label", "Ideal für"), value: t("keyFacts", "fact5Value", "Grundwasser-Gebiete") },
          { icon: "time", label: t("keyFacts", "fact6Label", "Installationszeit"), value: t("keyFacts", "fact6Value", "3 – 5 Tage") },
        ]}
      />

      {/* Advantages */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Wasser-Wasser-Wärmepumpe")} />
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
          "Höchster COP aller Wärmepumpen-Typen (5,0–6,0)",
          "Konstante Grundwassertemperatur (8–12°C) ganzjährig",
          "Effizientes Heizen und Kühlen möglich",
          "Niedrigste Betriebskosten aller WP-Systeme",
          "Sehr leiser Betrieb — kein Außengerät",
          "Unabhängig von Außentemperaturen",
        ])}
        cons={collectItems(t, "proscons", "con", [
          "Höchste Anschaffungskosten (Brunnenbohrung)",
          "Wasserrechtliche Genehmigung zwingend erforderlich",
          "Grundwasservorkommen muss vorhanden und geeignet sein",
          "Wasserqualität muss regelmäßig geprüft werden",
        ])}
      />

      {/* Funktionsweise */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("function", "title", "Funktionsweise")}
            subtitle={t("function", "subtitle", "So nutzt eine Wasser-Wasser-Wärmepumpe das Grundwasser.")}
          />
          <div className="mb-12 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t("function", "image", "/images/wp-system-diagram.jpg")}
              alt="Systemdarstellung einer Wasser-Wasser-Wärmepumpe mit Brunnenanlage"
              className="rounded-2xl shadow-md max-h-96 w-auto object-contain"
            />
          </div>
        </Container>
      </section>

      {/* Voraussetzungen */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("requirements", "title", "Voraussetzungen")} subtitle={t("requirements", "subtitle", "Was Sie für eine Wasser-Wasser-Wärmepumpe benötigen.")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {[
              { title: t("requirements", "req1Title", "Grundwasservorkommen"), desc: t("requirements", "req1Desc", "Ausreichend Grundwasser in erreichbarer Tiefe (typisch 5–15 Meter).") },
              { title: t("requirements", "req2Title", "Wasserqualität"), desc: t("requirements", "req2Desc", "Das Grundwasser muss bestimmte Qualitätskriterien erfüllen (Eisen-, Mangangehalt).") },
              { title: t("requirements", "req3Title", "Genehmigung"), desc: t("requirements", "req3Desc", "Eine wasserrechtliche Genehmigung der zuständigen Behörde ist erforderlich.") },
              { title: t("requirements", "req4Title", "Platzbedarf"), desc: t("requirements", "req4Desc", "Platz für Förder- und Schluckbrunnen mit ausreichendem Abstand zueinander.") },
            ].map((item) => (
              <Card key={item.title}>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Costs & Economics */}
      <CostsEconomics
        costBreakdown={{
          device: t("costs", "device", "10.000 – 18.000 €"),
          installation: t("costs", "installation", "3.000 – 5.000 €"),
          extras: t("costs", "extras", "7.000 – 17.000 €"),
          extrasLabel: t("costs", "extrasLabel", "Brunnenbohrung (Förder- & Schluckbrunnen)"),
          total: t("costs", "total", "20.000 – 40.000 €"),
        }}
        foerderung={{
          bpiRate: t("costs", "bpiRate", "30 %"),
          klimaBonus: t("costs", "klimaBonus", "+ 20 %"),
          einkommensBonus: t("costs", "einkommensBonus", "+ 30 %"),
          maxRate: t("costs", "maxRate", "bis 70 %"),
          exampleSavings: t("costs", "exampleSavings", "Bei 35.000 € Invest → ab 10.500 € Eigenanteil"),
        }}
        operating={{
          stromCostYear: t("costs", "stromCostYear", "500 – 800 €"),
          formula: t("costs", "formula", "20.000 kWh ÷ COP 5,5 × 0,30 €/kWh ≈ 3.636 kWh × 0,30 € ≈ 1.091 € (ohne PV)"),
        }}
        amortization={t("costs", "amortization", "10 – 14 Jahre (ohne Förderung), 5 – 8 Jahre (mit Förderung)")}
      />

      {/* PV Synergy */}
      <PVSynergySection
        eigenverbrauchBoost={t("pvSynergy", "eigenverbrauchBoost", "bis zu 40 %")}
        savingsExample={t("pvSynergy", "savingsExample", "Grundwasser-WP + PV: Betriebskosten sinken auf ca. 250–400 €/Jahr — nahezu kostenlos heizen.")}
      />

      {/* Installation */}
      <InstallationProcess
        duration={t("installation", "duration", "3 – 5 Tage (zzgl. Genehmigungsverfahren)")}
        steps={[
          { step: 1, title: t("installation", "step1Title", "Beratung & Grundwasseranalyse"), description: t("installation", "step1Desc", "Standortprüfung, Probebohrung und Wasserqualitätstest.") },
          { step: 2, title: t("installation", "step2Title", "Genehmigung einholen"), description: t("installation", "step2Desc", "Wasserrechtliche Genehmigung bei der Unteren Wasserbehörde beantragen.") },
          { step: 3, title: t("installation", "step3Title", "Förderantrag stellen"), description: t("installation", "step3Desc", "BAFA/KfW-Antrag einreichen — vor Baubeginn zwingend erforderlich.") },
          { step: 4, title: t("installation", "step4Title", "Förderbrunnen bohren"), description: t("installation", "step4Desc", "Bohrung des Förderbrunnens zur Grundwasserentnahme (5–15m Tiefe).") },
          { step: 5, title: t("installation", "step5Title", "Schluckbrunnen bohren"), description: t("installation", "step5Desc", "Bohrung des Schluckbrunnens zur Rückführung des abgekühlten Wassers.") },
          { step: 6, title: t("installation", "step6Title", "Wärmepumpe aufstellen"), description: t("installation", "step6Desc", "Innengerät installieren und an die Brunnenanlage anschließen.") },
          { step: 7, title: t("installation", "step7Title", "Hydraulische Anbindung"), description: t("installation", "step7Desc", "Verbindung zum Heizsystem, Pufferspeicher und Warmwasser.") },
          { step: 8, title: t("installation", "step8Title", "Inbetriebnahme & Einweisung"), description: t("installation", "step8Desc", "Pumptest, Systemoptimierung und Einweisung in die Bedienung.") },
        ]}
      />

      {/* Suitability Check */}
      <SuitabilityCheck
        title={t("suitability", "title", "Ist eine Wasser-Wasser-Wärmepumpe das Richtige für Sie?")}
        idealItems={collectItems(t, "suitability", "ideal", [
          "Grundwasser ist auf Ihrem Grundstück in 5–15m Tiefe erreichbar",
          "Maximale Effizienz und niedrigste Betriebskosten sind Priorität",
          "Sie möchten im Sommer effizient kühlen",
          "Langfristige Investition mit bestem Kosten-Nutzen-Verhältnis",
          "Ihr Grundstück bietet Platz für zwei Brunnen",
        ])}
        considerations={collectItems(t, "suitability", "consideration", [
          "Höchste Investitionskosten aller WP-Typen",
          "Grundwasservorkommen muss vorhanden und geeignet sein",
          "Genehmigungsverfahren dauert mehrere Wochen",
          "Regelmäßige Wasserqualitätsprüfung erforderlich",
        ])}
        conclusion={t("suitability", "conclusion", "Die Wasser-Wasser-Wärmepumpe erreicht den höchsten Wirkungsgrad aller Typen — die beste Wahl wenn Grundwasser verfügbar ist.")}
      />

      {/* Heating Cost Chart */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title={t("charts", "title", "Heizkosten im Vergleich")}
            subtitle={t("charts", "subtitle", "Wärmepumpe vs. konventionelle Heizsysteme — jährliche Kosten im Überblick.")}
          />
          <div className="max-w-2xl mx-auto">
            <HeatingCostChart />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen" />
          <FAQAccordion items={defaultFaq} />
        </Container>
      </section>

      <FoerderungServiceCallout />

      <WPTypeCrossLinks currentSlug="wasser-wasser-waermepumpe" />

      <CTABanner />
    </>
  );
}
