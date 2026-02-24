import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProsConsSectionProps {
  pros: string[];
  cons: string[];
  title?: string;
}

export function ProsConsSection({ pros, cons, title = "Vorteile und Nachteile ehrlich betrachtet" }: ProsConsSectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeading title={title} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Vorteile
              </h3>
              <ul className="space-y-3">
                {pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Nachteile
              </h3>
              <ul className="space-y-3">
                {cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-amber-900">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                    </svg>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
