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
  title: "Photovoltaik — Eigenen Strom erzeugen",
  description:
    "Photovoltaikanlagen von Arvernus: Professionelle Planung und Installation Ihrer Solaranlage. Stromkosten senken und unabhängig werden.",
};

export default async function PhotovoltaikPage() {
  const [faq, company, pageContent] = await Promise.all([getFAQ(), getCompany(), getPageContent("photovoltaik")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const pvCustomers = company.stats.pvCustomers ?? 15000;

  const pvBadges: TrustBadgeItem[] = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      label: `${pvCustomers.toLocaleString("de-DE")}+`,
      sublabel: "PV-Anlagen installiert",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: "Bis 80%",
      sublabel: "Eigenversorgung möglich",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: "25 Jahre",
      sublabel: "Modulgarantie",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: `Bis ${company.stats.maxFoerderung}%`,
      sublabel: "Staatliche Förderung",
    },
  ];

  return (
    <>
      <BreadcrumbNav items={[{ label: "Photovoltaik" }]} />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                {t("hero", "title", "Photovoltaik — Erzeugen Sie Ihren eigenen Strom")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {t("hero", "description", "Mit einer modernen Photovoltaikanlage erzeugen Sie Ihren eigenen Strom, senken Ihre Energiekosten und leisten einen Beitrag zum Klimaschutz. Von der Planung bis zur Installation — alles aus einer Hand.")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/kontakt" size="lg">Angebot anfragen</Button>
                <Button href="/waermepumpen-rechner" variant="outline" size="lg">Kombiniert mit Wärmepumpe</Button>
              </div>
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t("hero", "image", "/images/pv-house-full.jpg")}
                alt="Photovoltaikanlage auf einem Einfamilienhaus"
                className="rounded-2xl shadow-lg object-cover w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 border-b border-border">
        <Container>
          <TrustBadges items={pvBadges} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("benefits", "title", "Vorteile einer Photovoltaikanlage")}
            subtitle={t("benefits", "subtitle", "Warum sich Photovoltaik für Sie lohnt.")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("benefits", "benefit1Title", "Stromkosten senken"), desc: t("benefits", "benefit1Desc", "Erzeugen Sie bis zu 80% Ihres Stroms selbst und reduzieren Sie Ihre Stromrechnung deutlich.") },
              { title: t("benefits", "benefit2Title", "Einspeisevergütung"), desc: t("benefits", "benefit2Desc", "Überschüssigen Strom speisen Sie ins Netz ein und erhalten dafür eine garantierte Vergütung.") },
              { title: t("benefits", "benefit3Title", "Unabhängigkeit"), desc: t("benefits", "benefit3Desc", "Machen Sie sich unabhängig von steigenden Strompreisen und Energieversorgern.") },
              { title: t("benefits", "benefit4Title", "Wertsteigerung"), desc: t("benefits", "benefit4Desc", "Eine Solaranlage steigert den Wert Ihrer Immobilie nachhaltig.") },
              { title: t("benefits", "benefit5Title", "Umweltschutz"), desc: t("benefits", "benefit5Desc", "Jede kWh Solarstrom spart ca. 400g CO₂ — ein aktiver Beitrag zum Klimaschutz.") },
              { title: t("benefits", "benefit6Title", "Kombinierbar"), desc: t("benefits", "benefit6Desc", "Perfekt kombinierbar mit einer Wärmepumpe oder einem E-Auto für maximale Eigenversorgung.") },
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
            title={t("components", "title", "Komponenten Ihrer Solaranlage")}
            subtitle={t("components", "subtitle", "Hochwertige Technik für maximale Erträge.")}
          />
          <div className="mb-12 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t("components", "image", "/images/pv-roof-close.jpg")}
              alt="Photovoltaik-Module auf einem Ziegeldach — Nahaufnahme"
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {[
              { title: t("components", "comp1Title", "Solarmodule"), desc: t("components", "comp1Desc", "Hocheffiziente Module namhafter Hersteller mit mindestens 25 Jahren Leistungsgarantie.") },
              { title: t("components", "comp2Title", "Wechselrichter"), desc: t("components", "comp2Desc", "Wandelt den erzeugten Gleichstrom in nutzbaren Wechselstrom um — das Herzstück der Anlage.") },
              { title: t("components", "comp3Title", "Stromspeicher"), desc: t("components", "comp3Desc", "Optional: Speichert überschüssigen Strom für die Nutzung am Abend und in der Nacht.") },
              { title: t("components", "comp4Title", "Smart-Home-Integration"), desc: t("components", "comp4Desc", "Intelligente Steuerung für optimalen Eigenverbrauch und Monitoring per App.") },
            ].map((component) => (
              <Card key={component.title}>
                <CardTitle className="text-lg">{component.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{component.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zur Photovoltaik" />
          <FAQAccordion items={faq.photovoltaik} />
        </Container>
      </section>

      <CTABanner
        title={t("cta", "title", "Interesse an einer Solaranlage?")}
        description={t("cta", "description", "Lassen Sie sich kostenlos beraten — wir planen die optimale Anlage für Ihr Dach.")}
        primaryLabel="Beratung anfragen"
        primaryHref="/kontakt"
      />
    </>
  );
}
