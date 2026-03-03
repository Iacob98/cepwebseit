"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AboutTeaserProps {
  content?: Record<string, string>;
}

export function AboutTeaser({ content }: AboutTeaserProps) {
  const imageList = (content?.images || "/images/wp-outdoor.jpg")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  useEffect(() => {
    if (imageList.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [imageList.length, next]);

  const stats = [
    { value: "350+", label: "Projekte" },
    { value: "5 MW+", label: "Installiert" },
    { value: "8+", label: "Jahre Erfahrung" },
  ];

  return (
    <section className="py-20 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <span className="text-sm font-medium text-muted-foreground mb-2 block">
                {content?.label || "Über uns"}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                {content?.title || "Ihr lokaler Photovoltaik-Partner in Hennigsdorf"}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description || "Seit 2018 installieren wir Photovoltaikanlagen und Energiespeicher in Hennigsdorf und der Region Brandenburg. Unser erfahrenes Team begleitet Sie von der ersten Beratung bis zur fertigen Anlage — alles aus einer Hand."}
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description2 || "Solarstrom ab 6 ct/kWh gegenüber Netzstrom von 37 ct/kWh — mit einer eigenen PV-Anlage senken Sie Ihre Stromkosten um bis zu 80%.* Wir kümmern uns um Planung, Förderanträge und Installation."}
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href={content?.buttonHref || "/ueber-uns"}>
                  {content?.buttonLabel || "Mehr über uns"}
                </Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              {imageList.map((src, i) => (
                <div
                  key={src}
                  className="transition-opacity duration-1000 ease-in-out"
                  style={{
                    opacity: i === current ? 1 : 0,
                    position: i === 0 ? "relative" : "absolute",
                    inset: i === 0 ? undefined : 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={content?.imageAlt || "CEP Energie Team bei der Arbeit"}
                    className="h-auto w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}

              {imageList.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {imageList.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === current ? "w-6 bg-white" : "w-2 bg-white/60"
                      }`}
                      aria-label={`Bild ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
