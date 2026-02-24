import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CostBreakdown {
  device: string;
  installation: string;
  extras: string;
  extrasLabel: string;
  total: string;
}

interface Foerderung {
  bpiRate: string;
  klimaBonus: string;
  einkommensBonus: string;
  maxRate: string;
  exampleSavings: string;
}

interface Operating {
  stromCostYear: string;
  formula: string;
}

interface CostsEconomicsProps {
  costBreakdown: CostBreakdown;
  foerderung: Foerderung;
  operating: Operating;
  amortization: string;
  title?: string;
}

export function CostsEconomics({
  costBreakdown,
  foerderung,
  operating,
  amortization,
  title = "Kosten & Wirtschaftlichkeit",
}: CostsEconomicsProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeading title={title} subtitle="Investition, Förderung und Betriebskosten im Überblick." />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cost breakdown */}
          <ScrollReveal delay={0}>
            <Card className="h-full">
              <CardTitle className="text-lg">Kostenaufstellung</CardTitle>
              <CardContent>
                <table className="mt-4 w-full text-sm">
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 text-muted-foreground">Wärmepumpe</td>
                      <td className="py-2 text-right font-medium text-foreground">{costBreakdown.device}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-muted-foreground">Installation</td>
                      <td className="py-2 text-right font-medium text-foreground">{costBreakdown.installation}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-muted-foreground">{costBreakdown.extrasLabel}</td>
                      <td className="py-2 text-right font-medium text-foreground">{costBreakdown.extras}</td>
                    </tr>
                    <tr className="border-t-2 border-primary/30">
                      <td className="py-2 font-semibold text-foreground">Gesamt</td>
                      <td className="py-2 text-right font-bold text-primary">{costBreakdown.total}</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Förderung */}
          <ScrollReveal delay={0.1}>
            <Card className="h-full">
              <CardTitle className="text-lg">Förderung (BEG)</CardTitle>
              <CardContent>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Grundförderung</span>
                    <span className="font-semibold text-primary">{foerderung.bpiRate}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Klimageschw.-Bonus</span>
                    <span className="font-semibold text-primary">{foerderung.klimaBonus}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-primary-50 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Einkommens-Bonus</span>
                    <span className="font-semibold text-primary">{foerderung.einkommensBonus}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 text-sm border border-green-200">
                    <span className="font-semibold text-green-800">Maximal</span>
                    <span className="font-bold text-green-700">{foerderung.maxRate}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Ersparnis-Beispiel: {foerderung.exampleSavings}
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Betriebskosten */}
          <ScrollReveal delay={0.2}>
            <Card className="h-full">
              <CardTitle className="text-lg">Betriebskosten</CardTitle>
              <CardContent>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Jährliche Stromkosten (ca.)</p>
                    <p className="text-2xl font-bold text-primary">{operating.stromCostYear}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-mono text-muted-foreground">{operating.formula}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amortisation</p>
                    <p className="font-semibold text-foreground">{amortization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
