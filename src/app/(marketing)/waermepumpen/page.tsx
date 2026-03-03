import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { FoerderungServiceCallout } from "@/components/shared/FoerderungServiceCallout";
import { TrustBadgeItem } from "@/components/shared/TrustBadges";
import { HeatingCostChart } from "@/components/shared/HeatingCostChart";
import { COPComparisonChart } from "@/components/shared/COPComparisonChart";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { getServices, getFAQ, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Wärmepumpen — Effizient heizen mit erneuerbarer Energie",
  description:
    "Wärmepumpen von CEP Energie: Luft-Wasser, Sole-Wasser & Wasser-Wasser. Professionelle Beratung, Installation und bis zu 70% Förderung. Seit 2014.",
};

export default async function WaermepumpenPage() {
  const [servicesData, faq, pageContent] = await Promise.all([
    getServices(),
    getFAQ(),
    getPageContent("waermepumpen"),
  ]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const waermepumpenTypes = servicesData.waermepumpenTypes;

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
      <BreadcrumbNav items={[{ label: "Wärmepumpen" }]} />

      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">[WÄRMEPUMPEN]</span>
              <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                {t("hero", "title", "Wärmepumpen — Effizient heizen mit erneuerbarer Energie")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {t("hero", "description", "Eine Wärmepumpe nutzt kostenlose Umweltwärme aus Luft, Erde oder Grundwasser und wandelt sie in Heizenergie um. So sparen Sie bis zu 75% Heizkosten und profitieren von bis zu 70% staatlicher Förderung.")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/energie-rechner" size="lg">Kosten berechnen</Button>
                <Button href="/kontakt" variant="outline" size="lg">Beratung anfragen</Button>
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t("hero", "image", "/images/wp-outdoor.jpg")}
                alt="Wärmepumpe Außengerät an einem modernen Einfamilienhaus"
                className="rounded-2xl shadow-sm object-cover w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="py-8">
        <Container>
          <TrustBadges items={wpBadges} />
        </Container>
      </section>

      {/* Types */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("types", "title", "Wärmepumpen-Typen im Überblick")}
            subtitle={t("types", "subtitle", "Jeder Typ hat seine Stärken. Wir finden die optimale Lösung für Ihr Zuhause.")}
            tag="TYPEN"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {waermepumpenTypes.map((type) => (
              <Link key={type.slug} href={`/waermepumpen/${type.slug}`} className="group block">
                <Card hover className="h-full">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {type.title}
                  </CardTitle>
                  <CardContent>
                    <p className="mt-2">{type.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="font-semibold text-foreground">COP:</span>
                      <span className="text-primary font-bold">{type.cop}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {type.advantages.slice(0, 3).map((adv) => (
                        <li key={adv} className="flex items-center gap-2 text-sm">
                          <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {adv}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Mehr erfahren
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title={t("comparison", "title", "Wärmepumpen im Vergleich")}
            subtitle={t("comparison", "subtitle", "Finden Sie den passenden Typ für Ihre Anforderungen.")}
            tag="VERGLEICH"
          />
          <ComparisonTable
            types={waermepumpenTypes.map((wp) => ({
              slug: wp.slug,
              label: wp.title.replace("-Wärmepumpe", ""),
            }))}
            rows={[
              { label: "COP", values: ["3,0–4,5", "4,0–5,0", "5,0–6,0"] },
              { label: "Installationszeit", values: ["1–2 Tage", "3–5 Tage", "3–5 Tage"] },
              { label: "Kosten (ca.)*", values: ["15.000–25.000 €", "20.000–35.000 €", "20.000–40.000 €"] },
              { label: "Erdarbeiten", values: ["Keine", "Ja (Bohrung/Kollektor)", "Ja (Brunnen)"] },
              { label: "Genehmigung", values: ["Nein", "Teils erforderlich", "Ja"] },
              { label: "Kühlung möglich", values: ["Bedingt", "Ja (passiv)", "Ja"] },
              { label: "Ideal für", values: ["Bestand & Neubau", "Neubau + Grundstück", "Grundwasser-Gebiete"] },
            ]}
          />
        </Container>
      </section>

      {/* Heizkosten im Vergleich */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("charts", "title", "Heizkosten im Vergleich")}
            subtitle={t("charts", "subtitle", "Sehen Sie auf einen Blick, wie viel Sie mit einer Wärmepumpe sparen können.")}
            tag="KOSTEN"
          />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card>
              <CardTitle className="text-lg mb-4">Jährliche Heizkosten nach Heizsystem</CardTitle>
              <CardContent>
                <HeatingCostChart />
              </CardContent>
            </Card>
            <Card>
              <CardTitle className="text-lg mb-4">COP &amp; Kosten nach Wärmepumpen-Typ</CardTitle>
              <CardContent>
                <COPComparisonChart />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("benefits", "title", "Vorteile einer Wärmepumpe")}
            subtitle={t("benefits", "subtitle", "Warum sich der Umstieg auf eine Wärmepumpe lohnt.")}
            tag="VORTEILE"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("benefits", "benefit1Title", "Bis zu 75% Heizkosten sparen"), desc: t("benefits", "benefit1Desc", "Wärmepumpen nutzen bis zu 75% kostenlose Umweltwärme. Sie zahlen nur den Strom für den Betrieb.") },
              { title: t("benefits", "benefit2Title", "Staatliche Förderung bis 70%"), desc: t("benefits", "benefit2Desc", "Profitieren Sie von großzügigen Zuschüssen durch BAFA und KfW für den Heizungstausch.") },
              { title: t("benefits", "benefit3Title", "CO₂-neutral heizen"), desc: t("benefits", "benefit3Desc", "Mit einer Wärmepumpe und Ökostrom heizen Sie komplett CO₂-neutral und schützen das Klima.") },
              { title: t("benefits", "benefit4Title", "Heizen & Kühlen"), desc: t("benefits", "benefit4Desc", "Viele Wärmepumpen können im Sommer auch kühlen — ganz ohne zusätzliche Klimaanlage.") },
              { title: t("benefits", "benefit5Title", "Wartungsarm & langlebig"), desc: t("benefits", "benefit5Desc", "Wärmepumpen haben eine Lebensdauer von 20+ Jahren und benötigen nur minimale Wartung.") },
              { title: t("benefits", "benefit6Title", "Wertsteigerung Immobilie"), desc: t("benefits", "benefit6Desc", "Ein modernes Heizsystem steigert den Wert Ihrer Immobilie und verbessert die Energieklasse.") },
            ].map((benefit) => (
              <Card key={benefit.title}>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardContent>
                  <p className="mt-2 text-sm">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Förderung-Service */}
      <FoerderungServiceCallout />

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zu Wärmepumpen" tag="FAQ" />
          <FAQAccordion items={faq.waermepumpen} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
