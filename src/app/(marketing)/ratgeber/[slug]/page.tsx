import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { CTABanner } from "@/components/shared/CTABanner";
import { getArticles } from "@/lib/dal";
import { getArticleJsonLd } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.metaTitle || `${article.title} | CEP Energie Ratgeber`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      ...(article.image && { images: [{ url: article.image }] }),
    },
  };
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-foreground mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const listItems: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(<li key={i}>{lines[i].slice(2)}</li>);
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 ml-6 list-disc space-y-1 text-muted-foreground">
          {listItems}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="my-4 text-muted-foreground leading-relaxed">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

const categoryVariants: Record<string, "primary" | "secondary" | "default"> = {
  "Wärmepumpen": "primary",
  "Photovoltaik": "secondary",
  "Förderung": "default",
  "Energiesparen": "default",
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const articleJsonLd = getArticleJsonLd(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbNav
        items={[
          { label: "Ratgeber", href: "/ratgeber" },
          { label: article.title },
        ]}
      />

      <article className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant={categoryVariants[article.category] || "default"}>
                {article.category}
              </Badge>
              <span className="text-sm text-muted-foreground">{article.publishedDate}</span>
              {article.author && (
                <span className="text-sm text-muted-foreground">von {article.author}</span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">{article.excerpt}</p>

            {article.image && (
              <div className="mt-8 aspect-video rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <div className="mt-10 prose-like">
              {renderMarkdown(article.content)}
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-muted/30">
          <Container>
            <h2 className="text-2xl font-bold text-foreground mb-8">Weitere Artikel</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/ratgeber/${r.slug}`}
                  className="group rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABanner
        title="Kostenlose Beratung vereinbaren"
        description="Unsere Experten helfen Ihnen bei der Planung Ihrer Wärmepumpe oder Photovoltaikanlage."
      />
    </>
  );
}
