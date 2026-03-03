import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface SuitabilityCheckProps {
  idealItems: string[];
  considerations: string[];
  conclusion: string;
  title?: string;
}

export function SuitabilityCheck({
  idealItems,
  considerations,
  conclusion,
  title = "Ist diese Wärmepumpe das Richtige für Sie?",
}: SuitabilityCheckProps) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={title} />
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-800">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Ideal, wenn...
                </h3>
                <ul className="space-y-3">
                  {idealItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-800">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Beachten Sie...
                </h3>
                <ul className="space-y-3">
                  {considerations.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal>
            <div className="mt-8 rounded-xl bg-muted/30 border border-border p-6 text-center">
              <p className="text-foreground">{conclusion}</p>
              <div className="mt-4">
                <Button href="/energie-rechner">
                  Jetzt Kosten berechnen
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
