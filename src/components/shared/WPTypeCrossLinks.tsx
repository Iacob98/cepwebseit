import Link from "next/link";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { waermepumpenTypes } from "@/data/services";

interface WPTypeCrossLinksProps {
  currentSlug: string;
}

export function WPTypeCrossLinks({ currentSlug }: WPTypeCrossLinksProps) {
  const otherTypes = waermepumpenTypes.filter((t) => t.slug !== currentSlug);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Andere Wärmepumpen-Typen"
          subtitle="Vergleichen Sie die Alternativen und finden Sie die beste Lösung."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {otherTypes.map((type) => (
            <Link
              key={type.slug}
              href={`/waermepumpen/${type.slug}`}
              className="group block"
            >
              <Card hover className="h-full">
                <CardTitle className="group-hover:text-primary transition-colors">
                  {type.title}
                </CardTitle>
                <CardContent>
                  <p className="mt-2 text-sm">{type.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-1.5 text-sm font-semibold text-primary">
                    COP: {type.cop}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                    Mehr erfahren
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
