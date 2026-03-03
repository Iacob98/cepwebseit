"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Service } from "@/types";

const serviceImages: Record<string, string> = {
  "/photovoltaik": "/images/pv-roof-close.jpg",
  "/energiespeicher": "/images/pv-house-full.jpg",
  "/waermepumpen": "/images/wp-outdoor.jpg",
};

interface ServicesAccordionProps {
  services: Service[];
}

export function ServicesAccordion({ services }: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          label="Unsere Leistungen"
          title={
            <>Ganzheitliche <span className="text-primary">Energielösungen</span></>
          }
          tag="LEISTUNGEN"
          centered={false}
        />
        <ScrollReveal>
          <div className="border-t border-border">
            {services.map((service, i) => {
              const isOpen = openIndex === i;
              const number = String(i + 1).padStart(2, "0");
              const image = serviceImages[service.href] || "/images/pv-roof-close.jpg";

              return (
                <div key={service.href} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center gap-6 py-6 text-left cursor-pointer group"
                  >
                    <span className="text-2xl font-light text-muted-foreground/50 tabular-nums">
                      {number}
                    </span>
                    <span className="flex-1 text-xl font-semibold text-foreground sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                      {isOpen ? (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-8 pb-8 pl-0 sm:pl-14 lg:grid-cols-2">
                          <div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                              {service.description}
                            </p>
                            <ul className="mt-6 space-y-3">
                              {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                  <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-foreground">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <a
                              href={service.href}
                              className="mt-6 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                            >
                              Mehr erfahren
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                          <div className="overflow-hidden rounded-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image}
                              alt={service.title}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
