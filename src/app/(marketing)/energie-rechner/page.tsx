import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { RechnerForm } from "@/components/sections/rechner/RechnerForm";
import { getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Energie-Rechner — Kosten & Förderung berechnen",
  description:
    "Berechnen Sie kostenlos die Kosten und Förderung für Photovoltaik, Wärmepumpen und Energiespeicher. In nur 5 Schritten zu Ihrem individuellen Angebot.",
};

export default async function RechnerPage() {
  const pageContent = await getPageContent("energie-rechner");
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Energie-Rechner" }]} />
      <section className="py-12 bg-white">
        <Container className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {t("hero", "title", "Energie-Rechner")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("hero", "description", "Berechnen Sie in nur 5 Schritten die Kosten und Fördermöglichkeiten für Solar, Wärmepumpen und Speicher — kostenlos und unverbindlich.")}
          </p>
        </Container>
      </section>
      <RechnerForm />
      <section className="py-12">
        <Container>
          <TrustBadges />
        </Container>
      </section>
    </>
  );
}
