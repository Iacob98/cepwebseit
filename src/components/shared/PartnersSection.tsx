"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import type { Partner } from "@/types";

interface PartnersSectionProps {
  compact?: boolean;
  partners?: Partner[];
}

function MarqueeStrip({
  partners,
  compact = false,
}: {
  partners: Partner[];
  compact?: boolean;
}) {
  if (partners.length === 0) return null;

  const logoItem = (partner: Partner, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${partner.id ?? partner.name}`}
      className={`group flex flex-col items-center gap-${compact ? "1" : "3"} ${compact ? "" : "py-4 rounded-xl"} flex-shrink-0 transition-all duration-300`}
    >
      {compact ? (
        <>
          <Image
            src={partner.logo}
            alt={partner.name}
            width={partner.featured ? 120 : 100}
            height={partner.featured ? 40 : 32}
            className="h-8 w-auto object-contain"
            style={{ maxWidth: partner.featured ? 120 : 100 }}
          />
          <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {partner.name}
          </span>
        </>
      ) : (
        <>
          <div className="h-12 flex items-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              style={{ maxWidth: 140 }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {partner.name}
          </span>
        </>
      )}
    </div>
  );

  return (
    <div
      className="group/marquee relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex ${compact ? "gap-10" : "gap-8"} group-hover/marquee:[animation-play-state:paused]`}
        style={{
          animation: `marquee ${Math.max(partners.length * 4, 20)}s linear infinite`,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {partners.map((p) => logoItem(p, "a"))}
        {partners.map((p) => logoItem(p, "b"))}
      </div>
    </div>
  );
}

export function PartnersSection({ compact = false, partners: partnersProp }: PartnersSectionProps) {
  const partners = partnersProp ?? [];
  const featuredPartners = partners.filter((p) => p.featured);
  const otherPartners = partners.filter((p) => !p.featured);

  if (partners.length === 0) return null;

  if (compact) {
    const featuredNames = featuredPartners.map((p) => p.name).join(" & ");
    return (
      <section className="py-12 border-y border-border bg-white">
        <Container>
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            {featuredNames ? `Zertifizierter ${featuredNames} Partner` : ""} &middot; In Zusammenarbeit mit führenden Unternehmen der Branche
          </p>
          <MarqueeStrip partners={partners} compact />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Unsere Partner"
          subtitle="Wir arbeiten mit den führenden Unternehmen der Branche zusammen — für beste Qualität und Service."
        />

        {/* Featured partners */}
        {featuredPartners.length > 0 && (
          <ScrollReveal>
            <div className={`mx-auto mb-16 grid gap-6 ${featuredPartners.length > 1 ? "max-w-5xl grid-cols-1 md:grid-cols-2" : "max-w-2xl grid-cols-1"}`}>
              {featuredPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="rounded-2xl border-2 border-primary/20 bg-muted/30 border-border p-8 text-center shadow-sm"
                  >
                    <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                      {partner.badge ?? "Partner"}
                    </span>
                    <div className="flex justify-center mb-4">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={200}
                        height={64}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {partner.description ?? `Offizieller ${partner.name} Partner`}
                    </p>
                    {partner.featuredText && (
                      <p className="mt-2 text-muted-foreground">
                        {partner.featuredText}
                      </p>
                    )}
                    {partner.benefits && partner.benefits.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                        {partner.benefits.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </ScrollReveal>
        )}

        {/* Other partners — marquee */}
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Weitere Partner & Kooperationen
          </p>
          <MarqueeStrip partners={otherPartners} />
        </ScrollReveal>

        {/* Partner werden CTA */}
        <ScrollReveal>
          <div className="mt-16 rounded-2xl bg-muted/30 border border-border px-8 py-10 text-center">
            <h3 className="text-xl font-semibold text-foreground">
              Partner werden?
            </h3>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              Sie möchten Teil unseres Partnernetzwerks werden? Erfahren Sie mehr über die Vorteile einer Zusammenarbeit.
            </p>
            <Button href="/partner-werden" className="mt-6">
              Jetzt Partner werden
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
