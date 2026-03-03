import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface PVSynergySectionProps {
  eigenverbrauchBoost: string;
  savingsExample: string;
  title?: string;
}

export function PVSynergySection({
  eigenverbrauchBoost,
  savingsExample,
  title = "Wärmepumpe + Photovoltaik",
}: PVSynergySectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <ScrollReveal>
          <SectionHeading
            title={title}
            subtitle="Die ideale Kombination für maximale Unabhängigkeit und minimale Kosten."
          />
          <div className="mx-auto max-w-3xl">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p className="font-semibold text-foreground">Eigenverbrauch steigern</p>
                  <p className="text-sm text-muted-foreground">PV-Strom direkt für die Wärmepumpe nutzen — Eigenverbrauchsanteil um {eigenverbrauchBoost} steigern.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="font-semibold text-foreground">SG-Ready kompatibel</p>
                  <p className="text-sm text-muted-foreground">Smart-Grid-fähige Wärmepumpen nutzen automatisch günstigen PV-Überschuss zum Heizen oder Kühlen.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-foreground">Betriebskosten senken</p>
                  <p className="text-sm text-muted-foreground">{savingsExample}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <p className="font-semibold text-foreground">CEP Energie als Komplettanbieter</p>
                  <p className="text-sm text-muted-foreground">Wärmepumpe und PV-Anlage aus einer Hand — perfekt abgestimmt, ein Ansprechpartner.</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 text-center">
              <Button href="/photovoltaik" variant="outline">
                Mehr zu Photovoltaik
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
