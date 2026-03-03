"use client";

import { ServicesAccordion } from "@/components/sections/home/ServicesAccordion";
import type { Service } from "@/types";

interface ServicesOverviewProps {
  services: Service[];
  content?: Record<string, string>;
}

export function ServicesOverview({ services, content }: ServicesOverviewProps) {
  return (
    <ServicesAccordion
      services={services}
      label={content?.label}
      title={content?.title}
      highlightedTitle={content?.highlightedTitle}
    />
  );
}
