import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges, type TrustBadgeItem } from "@/components/shared/TrustBadges";
import { getFAQ, getCompany, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Energiespeicher — Solarstrom rund um die Uhr nutzen",
  description:
    "Batteriespeicher von CEP Energie: Maximieren Sie Ihren Eigenverbrauch und werden Sie unabhängig von steigenden Strompreisen. Beratung & Installation aus einer Hand.",
};

export default async function EnergiespeicherPage() {
  const [faq, company, pageContent] = await Promise.all([getFAQ(), getCompany(), getPageContent("energiespeicher")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const speicherBadges: TrustBadgeItem[] = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: "Bis 80%*",
      sublabel: "Eigenverbrauch möglich",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "15–20 Jahre*",
      sublabel: "Speicher-Lebensdauer",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: "Notstromfähig",
      sublabel: "Auf Wunsch verfügbar",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: `Bis ${company.stats.maxFoerderung}%*`,
      sublabel: "Staatliche Förderung",
    },
  ];

  return (
    <>
      <BreadcrumbNav items={[{ label: "Energiespeicher" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                {t("hero", "title", "Energiespeicher — Solarstrom rund um die Uhr")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {t("hero", "description", "Mit einem modernen Batteriespeicher nutzen Sie Ihren Solarstrom auch abends und nachts. Steigern Sie Ihren Eigenverbrauch auf bis zu 80% und machen Sie sich unabhängig von steigenden Strompreisen.")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/kontakt" size="lg">Speicher anfragen</Button>
                <Button href="/energie-rechner" variant="outline" size="lg">Kombiniert mit PV</Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t("hero", "image", "/images/pv-house-full.jpg")}
                  alt="Energiespeicher"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <TrustBadges items={speicherBadges} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("benefits", "title", "Vorteile eines Energiespeichers")}
            subtitle={t("benefits", "subtitle", "Warum sich ein Batteriespeicher für Sie lohnt.")}
           
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("benefits", "benefit1Title", "Eigenverbrauch maximieren"), desc: t("benefits", "benefit1Desc", "Steigern Sie Ihren Eigenverbrauch von ca. 30% auf bis zu 70–80% — so nutzen Sie Ihren Solarstrom optimal.") },
              { title: t("benefits", "benefit2Title", "Stromkosten senken"), desc: t("benefits", "benefit2Desc", "Weniger Strom aus dem Netz bedeutet geringere Stromkosten — auch bei steigenden Energiepreisen.") },
              { title: t("benefits", "benefit3Title", "Notstromversorgung"), desc: t("benefits", "benefit3Desc", "Viele Speichersysteme bieten eine Notstromfunktion — Ihr Zuhause bleibt auch bei Stromausfall versorgt.") },
              { title: t("benefits", "benefit4Title", "Unabhängigkeit"), desc: t("benefits", "benefit4Desc", "Machen Sie sich unabhängig von Energieversorgern und steigenden Netzentgelten.") },
              { title: t("benefits", "benefit5Title", "Netzentlastung"), desc: t("benefits", "benefit5Desc", "Ihr Speicher entlastet das Stromnetz und unterstützt die Energiewende aktiv.") },
              { title: t("benefits", "benefit6Title", "Nachrüstbar"), desc: t("benefits", "benefit6Desc", "Batteriespeicher können auch nachträglich zu einer bestehenden PV-Anlage ergänzt werden.") },
            ].map((benefit) => (
              <Card key={benefit.title}>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{benefit.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title={t("technology", "title", "Moderne Speichertechnologie")}
            subtitle={t("technology", "subtitle", "Zuverlässige Technik für Ihr Zuhause.")}
           
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {[
              { title: t("technology", "tech1Title", "Lithium-Eisenphosphat (LFP)"), desc: t("technology", "tech1Desc", "Sichere und langlebige Batterietechnologie mit über 10.000 Ladezyklen und 15–20 Jahren Lebensdauer.") },
              { title: t("technology", "tech2Title", "Hybridwechselrichter"), desc: t("technology", "tech2Desc", "Kombiniert PV-Wechselrichter und Batteriemanagement in einem Gerät — effizient und platzsparend.") },
              { title: t("technology", "tech3Title", "Smart Energy Management"), desc: t("technology", "tech3Desc", "Intelligente Steuerung optimiert Lade- und Entladezyklen automatisch für maximalen Eigenverbrauch.") },
              { title: t("technology", "tech4Title", "Modulare Erweiterung"), desc: t("technology", "tech4Desc", "Viele Systeme sind modular erweiterbar — passen Sie die Kapazität an Ihren wachsenden Bedarf an.") },
            ].map((tech) => (
              <Card key={tech.title}>
                <CardTitle className="text-lg">{tech.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{tech.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("combo", "title", "Perfekte Kombination: PV + Speicher")}
            subtitle={t("combo", "subtitle", "Gemeinsam noch wirtschaftlicher.")}
           
          />
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="text-3xl font-bold text-primary">~30%*</div>
                <p className="mt-2 text-sm text-muted-foreground">Eigenverbrauch ohne Speicher</p>
              </div>
              <div className="rounded-xl border-2 border-primary bg-muted/30 p-6">
                <div className="text-3xl font-bold text-primary">70–80%*</div>
                <p className="mt-2 text-sm text-muted-foreground">Eigenverbrauch mit Speicher</p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="text-3xl font-bold text-primary">~315 €*</div>
                <p className="mt-2 text-sm text-muted-foreground">pro kWh Speicherkapazität</p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              * Angaben sind Richtwerte und können je nach individuellem Verbrauchsprofil, Anlagengröße und Standort abweichen.
            </p>
          </div>
        </Container>
      </section>

      {faq.energiespeicher && faq.energiespeicher.length > 0 && (
        <section className="py-20 bg-muted/30">
          <Container className="max-w-3xl">
            <SectionHeading title="Häufige Fragen zu Energiespeichern" />
            <FAQAccordion items={faq.energiespeicher} />
          </Container>
        </section>
      )}

      <CTABanner
        title={t("cta", "title", "Interesse an einem Energiespeicher?")}
        description={t("cta", "description", "Lassen Sie sich kostenlos beraten — wir finden den passenden Speicher für Ihre Anlage.")}
        image={t("cta", "image", "/images/pv-roof-close.jpg")}
        primaryLabel="Beratung anfragen"
        primaryHref="/kontakt"
      />
    </>
  );
}
