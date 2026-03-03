import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PartnerForm } from "@/components/sections/partner/PartnerForm";
import { getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Partner werden — Gemeinsam die Energiewende gestalten",
  description:
    "Werden Sie Partner von CEP Energie. Profitieren Sie von unserer Expertise in Photovoltaik, Wärmepumpen und Energiespeicher — für gemeinsames Wachstum.",
};

const benefits = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Zertifizierte Expertise",
    description: "Profitieren Sie von unserer langjährigen Erfahrung und Zertifizierungen führender Hersteller.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Starkes Netzwerk",
    description: "Werden Sie Teil eines wachsenden Netzwerks aus Fachbetrieben und Branchenexperten.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Technischer Support",
    description: "Unser Expertenteam steht Ihnen bei Planung, Installation und Service zur Seite.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Gemeinsames Wachstum",
    description: "Erweitern Sie Ihr Geschäftsfeld mit zukunftssicheren Lösungen in der Energiewende.",
  },
];

const statsConfig = [
  { key: "employees", suffix: "+", label: "Mitarbeiter" },
  { key: "dailyInstallations", suffix: "", label: "Anlagen/Tag" },
  { key: "montageTeams", suffix: "+", label: "Montageteams" },
  { key: "locations", suffix: "", label: "Standorte" },
];

export default async function PartnerWerdenPage() {
  const pageContent = await getPageContent("partner-werden");
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Partner werden" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">[PARTNER]</span>
            <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Partner werden")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "Sie sind Fachbetrieb im Bereich Heizung, Solar oder Elektro? Werden Sie Teil unseres Partnernetzwerks und profitieren Sie von einer starken Zusammenarbeit.")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-background">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                {t("stats", "title", "CEP Energie in Zahlen")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("stats", "description", "Als einer der führenden Anbieter für Wärmepumpen und Photovoltaik in Deutschland setzen wir auf Qualität, Wachstum und starke Partnerschaften.")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-8">
              {statsConfig.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-border bg-muted/30 p-8 text-center"
                >
                  <div className="text-4xl font-extrabold text-primary sm:text-5xl">
                    {t("stats", stat.key, "0")}{stat.suffix}
                  </div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t("benefits", "title", "Ihre Vorteile als Partner")}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-border bg-background p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50 text-primary">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t("form", "title", "Jetzt Partneranfrage senden")}
              </h2>
              <PartnerForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
