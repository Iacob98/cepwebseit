"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 sm:py-28 lg:py-36">
      {/* Background image slider */}
      {hasSlides && (
        <div className="absolute inset-0">
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
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70" />
        </div>
      )}

      {/* Fallback background pattern (shown when no slides) */}
      {!hasSlides && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }} />
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        </>
      )}

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="primary" className="mb-6 bg-primary/20 text-primary-light">
              {content?.badge || "Zertifizierter Fachbetrieb · Seit 2014"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {content?.title || (<>Ihre Experten für{" "}<span className="text-primary-light">Wärmepumpen</span> &{" "}<span className="text-primary-light">Photovoltaik</span></>)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
              {content?.subtitle || "Von der Beratung bis zur Installation — alles aus einer Hand. Profitieren Sie von bis zu 70% staatlicher Förderung und senken Sie Ihre Energiekosten nachhaltig."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/waermepumpen-rechner" size="lg">
                {content?.primaryButton || "Kostenlos berechnen"}
              </Button>
              <Button href="/kontakt" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                {content?.secondaryButton || "Beratung anfragen"}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Dot indicators */}
      {sortedSlides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {sortedSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
