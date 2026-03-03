import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { getFAQ, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Förderung für Photovoltaik & Energiespeicher — 0% MwSt. & mehr",
  description:
    "0% Mehrwertsteuer auf PV-Anlagen, KfW-Kredite, Berlin SolarPLUS und Einspeisevergütung. Alle Fördermöglichkeiten für Ihre Solaranlage im Überblick.",
};

const foerderungen = [
  {
    title: "0% Mehrwertsteuer",
    highlight: "0% MwSt.",
    description: "Seit 2023 entfällt die Mehrwertsteuer auf PV-Anlagen bis 30 kWp komplett — für Kauf, Lieferung und Installation.",
    eligible: "Private Wohngebäude mit PV-Anlage bis 30 kWp",
  },
  {
    title: "Einkommensteuerbefreiung",
    highlight: "Steuerfrei",
    description: "Einnahmen aus PV-Anlagen bis 30 kWp sind seit 2023 von der Einkommensteuer befreit — keine Gewerbeanmeldung nötig.",
    eligible: "Private PV-Anlagen bis 30 kWp",
  },
  {
    title: "KfW 270 — Erneuerbare Energien",
    highlight: "Kredit",
    description: "Zinsgünstige Kredite der KfW-Bank für PV-Anlagen und Batteriespeicher. Finanzierung bis 100% der Investitionskosten möglich.",
    eligible: "Alle Privatpersonen und Unternehmen",
  },
  {
    title: "Einspeisevergütung (EEG)",
    highlight: "7,78 ct*",
    description: "Für jede ins Netz eingespeiste kWh erhalten Sie eine gesetzlich garantierte Vergütung über 20 Jahre. Teileinspeisung: 7,78 ct/kWh, Volleinspeisung: 12,35 ct/kWh (bis 10 kWp).*",
    eligible: "Alle PV-Anlagenbetreiber",
  },
];

export default async function FoerderungPage() {
  const [faq, pageContent] = await Promise.all([getFAQ(), getPageContent("foerderung")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Förderung" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Förderung für Photovoltaik & Energiespeicher")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "0% Mehrwertsteuer auf PV-Anlagen, zinsgünstige KfW-Kredite und garantierte Einspeisevergütung — wir helfen Ihnen, alle Fördermöglichkeiten auszuschöpfen.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/kontakt" size="lg">Kostenlose Beratung</Button>
              <Button href="/energie-rechner" variant="outline" size="lg">Ersparnisse berechnen</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Bundesweite Förderung */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("overview", "title", "Förderung im Überblick")}
            subtitle={t("overview", "subtitle", "Diese Vorteile gelten bundesweit für Photovoltaik und Energiespeicher.")}
           
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {foerderungen.map((item) => (
              <Card key={item.title} hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white text-xs font-bold flex-shrink-0 text-center leading-tight">
                    {item.highlight}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardContent>
                      <p className="mt-1 text-sm">{item.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        <strong>Berechtigt:</strong> {item.eligible}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Regionale Förderung */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title="Regionale Förderung: Berlin & Brandenburg"
            subtitle="Je nach Standort gibt es zusätzliche Fördermöglichkeiten."
           
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            <Card>
              <CardTitle className="text-lg">Berlin — SolarPLUS</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Zuschuss für PV + Speicher an Eigenheimen
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Bis zu 15.000 € für Einfamilienhäuser*
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Bis zu 30.000 € für Mehrfamilienhäuser*
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Antrag über IBB — vor Projektstart!
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Solarpflicht Berlin: Neubauten und wesentliche Dachsanierungen müssen mind. 30% der Dachfläche mit PV belegen.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardTitle className="text-lg">Brandenburg</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-muted-foreground font-bold">—</span>
                    Aktuell kein Landes-Förderprogramm für private PV
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Alle bundesweiten Förderungen gelten vollständig
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    0% MwSt. + KfW-Kredit + Einspeisevergütung
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">+</span>
                    Einkommensteuerbefreiung für PV-Erträge
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Solarpflicht Brandenburg: Seit Juni 2024 für gewerbliche Neubauten mit Dachfläche ab 50 m².
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Rechenbeispiel PV */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Rechenbeispiel: 10 kWp PV-Anlage*" subtitle="So rechnet sich Ihre Solaranlage." />
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">PV-Anlage 10 kWp (inkl. Installation)</span>
                <span className="font-semibold">~14.000 €</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Mehrwertsteuer (0% seit 2023)</span>
                <span className="font-semibold text-primary">0 €</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Jährlicher Ertrag (~10.000 kWh)</span>
                <span className="font-semibold">~10.000 kWh</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Eigenverbrauch (30% = 3.000 kWh × 0,37 €)</span>
                <span className="font-semibold text-primary">~1.110 € gespart</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Einspeisung (70% = 7.000 kWh × 0,078 €)</span>
                <span className="font-semibold text-primary">~546 € Vergütung</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Jährlicher Gesamtvorteil</span>
                <span className="font-semibold text-primary text-lg">~1.656 €/Jahr</span>
              </div>
              <div className="flex justify-between py-4 bg-muted/30 rounded-lg px-4 -mx-4">
                <span className="font-bold text-foreground text-lg">Amortisation*</span>
                <span className="font-bold text-3xl text-primary">~8 Jahre</span>
              </div>
            </div>
          </Card>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            * Unverbindliches Rechenbeispiel auf Basis aktueller Durchschnittspreise (Stand 2026). Tatsächliche Erträge hängen von Dachausrichtung, Neigung, Verschattung und Verbrauchsprofil ab. Einspeisevergütung: 7,78 ct/kWh Teileinspeisung ab Feb. 2026, Degression -1% halbjährlich.
          </p>
        </Container>
      </section>

      {/* Prozess */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("process", "title", "So unterstützen wir Sie")} subtitle={t("process", "subtitle", "Von der Beratung bis zur Inbetriebnahme.")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              { step: "1", title: t("process", "step1Title", "Kostenlose Beratung"), desc: t("process", "step1Desc", "Wir analysieren Ihr Dach, berechnen die optimale Anlagengröße und prüfen alle Fördermöglichkeiten.") },
              { step: "2", title: t("process", "step2Title", "Angebot & Förderanträge"), desc: t("process", "step2Desc", "Sie erhalten ein transparentes Angebot. Wir unterstützen bei KfW-Antrag und Netzanmeldung.") },
              { step: "3", title: t("process", "step3Title", "Installation & Inbetriebnahme"), desc: t("process", "step3Desc", "Professionelle Montage durch unser eigenes Team. Anschließend Inbetriebnahme und Einweisung.") },
            ].map((item) => (
              <Card key={item.step} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                  {item.step}
                </span>
                <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zur Förderung" />
          <FAQAccordion items={faq.foerderung} />
        </Container>
      </section>

      <CTABanner
        title={t("cta", "title", "Förderung nutzen — jetzt beraten lassen")}
        description={t("cta", "description", "Wir prüfen kostenlos Ihre Fördermöglichkeiten und erstellen ein individuelles Angebot für Ihre Solaranlage.")}
        image={t("cta", "image", "/images/pv-roof-close.jpg")}
      />
    </>
  );
}
