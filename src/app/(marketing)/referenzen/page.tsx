import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { CTABanner } from "@/components/shared/CTABanner";
import { getProjects, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Referenzen — Unsere Projekte",
  description:
    "Über 1.000 erfolgreich realisierte Projekte. Sehen Sie ausgewählte Referenzen unserer Wärmepumpen- und Photovoltaik-Installationen.",
};

const categoryLabels: Record<string, string> = {
  waermepumpe: "Wärmepumpe",
  photovoltaik: "Photovoltaik",
  kombiniert: "Kombiniert",
};

const categoryVariants: Record<string, "primary" | "secondary" | "default"> = {
  waermepumpe: "primary",
  photovoltaik: "secondary",
  kombiniert: "default",
};

export default async function ReferenzenPage() {
  const [projects, pageContent] = await Promise.all([getProjects(), getPageContent("referenzen")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Referenzen" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Unsere Referenzen")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "Über 1.000 erfolgreich realisierte Projekte seit 2014. Hier zeigen wir Ihnen eine Auswahl unserer Arbeiten.")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} hover>
                {project.image ? (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 mb-4 flex items-center justify-center">
                    <svg className="h-12 w-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={categoryVariants[project.category]}>
                    {categoryLabels[project.category]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardContent>
                  <p className="mt-2 text-sm">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.specs.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title={t("cta", "title", "Ihr Projekt könnte das nächste sein")}
        description={t("cta", "description", "Kontaktieren Sie uns für eine kostenlose Beratung und ein individuelles Angebot.")}
        image={t("cta", "image", "/images/pv-roof-close.jpg")}
      />
    </>
  );
}
