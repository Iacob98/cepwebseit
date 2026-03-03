"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { HeroSlideData } from "@/lib/dal-schemas";

interface HeroSectionProps {
  content?: Record<string, string>;
  slides?: HeroSlideData[];
}

export function HeroSection({ content, slides = [] }: HeroSectionProps) {
  const sortedSlides = [...slides]
    .filter((s) => s.image)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const hasSlides = sortedSlides.length > 0;

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sortedSlides.length);
  }, [sortedSlides.length]);

  useEffect(() => {
    if (sortedSlides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [sortedSlides.length, next]);

  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36 overflow-hidden">
      <Container>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 items-center gap-12">
          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-medium text-muted-foreground mb-4 block">
              // {content?.badge || "Zertifizierter Fachbetrieb · Seit 2018"}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {content?.title || (<>Ihre Experten für{" "}<span className="text-primary">Photovoltaik</span> &{" "}<span className="text-primary">Energiespeicher</span></>)}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              {content?.subtitle || "Solarstrom ab 6 ct/kWh statt 37 ct/kWh aus dem Netz. Von der Beratung bis zur Installation — alles aus einer Hand. 0% Mehrwertsteuer auf PV-Anlagen."}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/energie-rechner" size="lg">
                {content?.primaryButton || "Kostenlos berechnen"}
              </Button>
              <Button href="/kontakt" variant="outline" size="lg">
                {content?.secondaryButton || "Beratung anfragen"}
              </Button>
            </div>
          </motion.div>

          {/* Right column — photo slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative w-full"
          >
            {hasSlides ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                {sortedSlides.map((slide, i) => (
                  <div
                    key={slide.id}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: i === current ? 1 : 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.title || ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}

                {/* Dot indicators */}
                {sortedSlides.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {sortedSlides.map((slide, i) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === current ? "w-6 bg-white" : "w-2 bg-white/60"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gray-200 flex items-center justify-center">
                <svg className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
