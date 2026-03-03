"use client";

import { ServicesAccordion } from "@/components/sections/home/ServicesAccordion";
import type { Service } from "@/types";

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return <ServicesAccordion services={services} />;
}
