import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { CTABanner } from "@/components/shared/CTABanner";
import { getTeam, getTimeline, getCompany, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Über uns — Seit 2018 Ihr Energiepartner in Brandenburg",
  description:
    "CEP Clever Energie Power GmbH: Seit 2018 Ihr zertifizierter Fachbetrieb für Photovoltaik, Wärmepumpen und Energiespeicher in Hennigsdorf. Lernen Sie unser Team kennen.",
};

export default async function UeberUnsPage() {
  const [team, timeline, company, pageContent] = await Promise.all([
    getTeam(),
    getTimeline(),
    getCompany(),
    getPageContent("ueber-uns"),
  ]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Über uns" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Über CEP Energie")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "Seit 2018 sind wir Ihr verlässlicher Partner für Photovoltaik, Wärmepumpen und Energiespeicher in Hennigsdorf und Brandenburg. Mit über 350 realisierten Projekten und einem erfahrenen Team stehen wir für Qualität, Zuverlässigkeit und Innovation.")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <TrustBadges stats={company.stats} foundedYear={company.foundedYear} />
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("timeline", "title", "Unsere Geschichte")} subtitle={t("timeline", "subtitle", "Von der Gründung bis heute.")} />
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-primary/20 ml-4 space-y-10">
              {timeline.map((event) => (
                <div key={event.id} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-2 border-white" />
                  <span className="text-sm font-bold text-primary">{event.year}</span>
                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  <p className="mt-1 text-muted-foreground">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("team", "title", "Unser Team")} subtitle={t("team", "subtitle", "Die Menschen hinter CEP Energie.")} />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.id} className="text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <svg className="h-10 w-10 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <CardContent>
                  <p className="mt-2 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Zertifikate */}
      {(company.certificates?.length ?? 0) > 0 && (
      <section className="py-20">
        <Container>
          <SectionHeading title={t("certificates", "title", "Zertifikate")} subtitle={t("certificates", "subtitle", "Qualität, der Sie vertrauen können.")} />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-3xl mx-auto">
            {(company.certificates ?? []).map((cert, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-xl border border-border bg-background text-center">
                {cert.image ? (
                  <div className="h-16 w-16 flex items-center justify-center mb-3">
                    <Image src={cert.image} alt={cert.name} width={64} height={64} className="h-14 w-auto object-contain" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                )}
                <span className="text-sm font-medium text-foreground">{cert.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      )}

      <CTABanner
        title={t("cta", "title", "Lassen Sie sich von uns beraten")}
        description={t("cta", "description", "Lernen Sie uns persönlich kennen — wir freuen uns auf Ihr Projekt.")}
      />
    </>
  );
}
