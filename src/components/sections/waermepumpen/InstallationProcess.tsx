import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface InstallationStep {
  step: number;
  title: string;
  description: string;
}

interface InstallationProcessProps {
  steps: InstallationStep[];
  duration: string;
  title?: string;
}

export function InstallationProcess({
  steps,
  duration,
  title = "So läuft Ihre Installation ab",
}: InstallationProcessProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeading title={title} subtitle={`Typische Projektdauer: ${duration}`} />
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-primary/20 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={0.08 * i}>
                <div className="relative flex items-start gap-4 sm:pl-14">
                  {/* Circle */}
                  <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md sm:absolute sm:left-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
