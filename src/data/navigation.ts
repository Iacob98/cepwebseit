import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Photovoltaik", href: "/photovoltaik" },
  { label: "Energiespeicher", href: "/energiespeicher" },
  { label: "Förderung", href: "/foerderung" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Wärmepumpen", href: "/waermepumpen" },
];

export const footerNavigation = {
  services: [
    { label: "Photovoltaik", href: "/photovoltaik" },
    { label: "Energiespeicher", href: "/energiespeicher" },
    { label: "Wärmepumpen", href: "/waermepumpen" },
  ],
  company: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Förderung", href: "/foerderung" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  resources: [
    { label: "Energie-Rechner", href: "/energie-rechner" },
    { label: "Ratgeber", href: "/ratgeber" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
