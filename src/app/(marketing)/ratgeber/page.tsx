import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { CTABanner } from "@/components/shared/CTABanner";
import { getArticles, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Ratgeber — Wärmepumpen, Photovoltaik & Förderung",
  description:
    "Expertenwissen rund um Photovoltaik, Wärmepumpen, Energiespeicher und Förderung. Aktuelle Artikel und Tipps von CEP Energie.",
};

const categoryVariants: Record<string, "primary" | "secondary" | "default"> = {
  "Wärmepumpen": "primary",
  "Photovoltaik": "secondary",
  "Förderung": "default",
  "Energiesparen": "default",
};

export default async function RatgeberPage() {
  const [articles, pageContent] = await Promise.all([getArticles(), getPageContent("ratgeber")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;
  const featured = articles.filter((a) => a.featured);
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <>
      <BreadcrumbNav items={[{ label: "Ratgeber" }]} />

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Ratgeber")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "Expertenwissen rund um Wärmepumpen, Photovoltaik, Förderung und Energiesparen. Informieren Sie sich mit unseren aktuellen Artikeln.")}
            </p>
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-2xl font-bold text-foreground mb-8">Empfohlene Artikel</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {featured.map((article) => (
                <Link
                  key={article.id}
                  href={`/ratgeber/${article.slug}`}
                  className="group rounded-xl border border-border bg-background overflow-hidden hover:shadow-sm transition-shadow"
                >
                  {article.image ? (
                    <div className="aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <svg className="h-12 w-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={categoryVariants[article.category] || "default"}>
                        {article.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{article.publishedDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 bg-muted/30">
        <Container>
          {categories.map((category) => {
            const categoryArticles = articles.filter((a) => a.category === category);
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/ratgeber/${article.slug}`}
                      className="group rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={categoryVariants[article.category] || "default"}>
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{article.publishedDate}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary">
                        Weiterlesen &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <CTABanner
        title={t("cta", "title", "Haben Sie Fragen?")}
        description={t("cta", "description", "Unsere Experten beraten Sie kostenlos und unverbindlich zu Wärmepumpen, Photovoltaik und Fördermöglichkeiten.")}
      />
    </>
  );
}
