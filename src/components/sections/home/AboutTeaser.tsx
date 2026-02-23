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

  return (
    <section className="py-20 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                {content?.label || "Über uns"}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                {content?.title || "Meisterbetrieb mit Leidenschaft — seit 2014"}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description || "Als inhabergeführter Meisterbetrieb stehen wir seit über einem Jahrzehnt für höchste Qualität bei der Installation von Wärmepumpen und Photovoltaikanlagen. Unser erfahrenes Team aus zertifizierten Fachkräften begleitet Sie von der ersten Beratung bis zur fertigen Anlage — persönlich, zuverlässig und mit echtem Engagement."}
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description2 || "Was uns antreibt? Die Überzeugung, dass nachhaltige Energie für jeden zugänglich sein sollte. Deshalb setzen wir auf faire Preise, modernste Technik und einen Service, der keine Wünsche offen lässt."}
              </p>
              <div className="mt-8">
                <Button href={content?.buttonHref || "/ueber-uns"}>
                  {content?.buttonLabel || "Mehr über uns"}
                </Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
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
                    alt={content?.imageAlt || "Arvernus Team bei der Arbeit"}
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
