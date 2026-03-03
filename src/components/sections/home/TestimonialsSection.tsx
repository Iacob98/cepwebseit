"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  pvCustomers?: number;
}

export function TestimonialsSection({ testimonials, pvCustomers }: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const customerText = pvCustomers
    ? `Über ${pvCustomers.toLocaleString("de-DE")} zufriedene Kunden vertrauen auf unsere Expertise.`
    : "Unsere Kunden vertrauen auf unsere Expertise.";

  const isPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);

    const cardWidth = 350 + 24;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, testimonials.length - 1));
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (isPaused.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = 350 + 24;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 7000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoplay]);

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    isPaused.current = true;
  }, []);
  const handleMouseLeave = useCallback(() => {
    isPaused.current = false;
  }, []);

  // Pause when modal is open
  useEffect(() => {
    isPaused.current = !!selectedTestimonial;
  }, [selectedTestimonial]);

  // Close modal on Escape
  useEffect(() => {
    if (!selectedTestimonial) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedTestimonial(null);
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTestimonial]);

  function scrollTo(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 350 + 24;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
    startAutoplay();
  }

  function scrollToIndex(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 350 + 24;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    startAutoplay();
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Das sagen unsere Kunden"
          subtitle={customerText}
        />
        <div className="relative">
          {/* Carousel */}
          <div
            ref={scrollRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex gap-6 overflow-x-auto scroll-snap-x-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id ?? testimonial.name}
                className="w-[350px] flex-shrink-0"
                style={{ scrollSnapAlign: "start" }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  onClick={() => setSelectedTestimonial(testimonial)}
                />
              </div>
            ))}
          </div>

          {/* Arrow buttons — desktop only */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={() => scrollTo("left")}
                disabled={!canScrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-border text-foreground transition hover:bg-muted/50 disabled:opacity-0 disabled:pointer-events-none lg:flex"
                aria-label="Vorherige Bewertung"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("right")}
                disabled={!canScrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-border text-foreground transition hover:bg-muted/50 disabled:opacity-0 disabled:pointer-events-none lg:flex"
                aria-label="Nächste Bewertung"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {testimonials.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Bewertung ${i + 1}`}
              />
            ))}
          </div>
        )}
      </Container>

      {/* Testimonial Modal */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-gray-100 hover:text-foreground"
              aria-label="Schließen"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-6 w-6 ${i < selectedTestimonial.rating ? "text-accent" : "text-border"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Full text */}
            <blockquote className="text-lg leading-relaxed text-foreground">
              &ldquo;{selectedTestimonial.text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
              {selectedTestimonial.image && (
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-foreground">{selectedTestimonial.name}</p>
                <p className="text-muted-foreground">
                  {selectedTestimonial.location} &middot; {selectedTestimonial.service}
                </p>
                <p className="text-sm text-muted-foreground/70">{selectedTestimonial.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
