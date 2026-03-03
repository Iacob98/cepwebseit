"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TrustSignalsProps {
  stats?: {
    projectsCompleted: number;
    satisfactionRate: number;
    maxFoerderung: number;
    pvCustomers?: number;
  };
  foundedYear?: number;
}

export function TrustSignals({ stats, foundedYear = 2014 }: TrustSignalsProps) {
  const yearsExperience = new Date().getFullYear() - foundedYear;

  const items = [
    { target: stats?.projectsCompleted ?? 350, suffix: "+", label: "PV-Anlagen installiert" },
    { target: stats?.satisfactionRate ?? 97, suffix: "%", label: "Kundenzufriedenheit" },
    { target: yearsExperience, suffix: "+", label: "Jahre Erfahrung" },
    { target: 0, suffix: "%", label: "MwSt. auf PV-Anlagen" },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:divide-x divide-border">
            {items.map((stat) => (
              <div key={stat.label} className="text-center px-10 lg:px-14 py-4 sm:py-0">
                <div className="text-5xl lg:text-6xl font-bold text-foreground">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
