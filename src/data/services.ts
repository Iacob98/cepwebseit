import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Photovoltaik",
    description:
      "Erzeugen Sie Ihren eigenen Strom mit einer modernen Solaranlage. Von der Planung bis zur Installation — alles aus einer Hand.",
    href: "/photovoltaik",
    icon: "sun",
    features: [
      "Eigenen Strom erzeugen",
      "Stromkosten senken",
      "Einspeisevergütung erhalten",
      "Unabhängigkeit vom Stromnetz",
    ],
  },
  {
    title: "Energiespeicher",
    description:
      "Speichern Sie Ihren Solarstrom für die Nutzung rund um die Uhr. Moderne Batteriespeicher maximieren Ihren Eigenverbrauch.",
    href: "/energiespeicher",
    icon: "battery",
    features: [
      "Eigenverbrauch auf 70–80%* steigern",
      "Unabhängigkeit von Strompreisen",
      "Notstromfähig",
      "Kompakt & wartungsarm",
    ],
  },
  {
    title: "Wärmepumpen",
    description:
      "Effiziente Wärmepumpen für Ihr Zuhause. Luft-Wasser-Wärmepumpen für maximale Energieeinsparung.",
    href: "/waermepumpen",
    icon: "flame",
    features: [
      "Bis zu 75% Heizkosten sparen*",
      "Staatliche Förderung bis 70%*",
      "Umweltfreundlich & leise",
      "Wartungsarm & langlebig",
    ],
  },
];

export const waermepumpenTypes = [
  {
    title: "Luft-Wasser-Wärmepumpe",
    slug: "luft-wasser-waermepumpe",
    description:
      "Die beliebteste Wärmepumpenart. Nutzt die Außenluft als Wärmequelle und ist besonders einfach zu installieren.",
    advantages: [
      "Geringe Installationskosten",
      "Keine Erdarbeiten nötig",
      "Schnelle Montage (1–2 Tage)",
      "Ideal für Bestandsgebäude",
      "Kombinierbar mit Photovoltaik",
    ],
    cop: "3,0–4,5",
    idealFor: "Neubauten und gut gedämmte Bestandsgebäude",
  },
  {
    title: "Sole-Wasser-Wärmepumpe",
    slug: "sole-wasser-waermepumpe",
    description:
      "Nutzt die konstante Erdwärme über Erdsonden oder Flächenkollektoren. Besonders effizient und leise.",
    advantages: [
      "Höchste Effizienz (COP bis 5,0)",
      "Konstante Leistung ganzjährig",
      "Kein Außengerät nötig",
      "Sehr leiser Betrieb",
      "Passive Kühlung im Sommer möglich",
    ],
    cop: "4,0–5,0",
    idealFor: "Neubauten mit verfügbarer Grundstücksfläche",
  },
  {
    title: "Wasser-Wasser-Wärmepumpe",
    slug: "wasser-wasser-waermepumpe",
    description:
      "Nutzt Grundwasser als Wärmequelle. Höchste Effizienz bei verfügbarem Grundwasser.",
    advantages: [
      "Höchster Wirkungsgrad aller WP-Typen",
      "Grundwasser hat konstant 8–12°C",
      "Kühlung im Sommer inklusive",
      "Sehr niedrige Betriebskosten",
      "Lange Lebensdauer",
    ],
    cop: "5,0–6,0",
    idealFor: "Gebiete mit zugänglichem Grundwasser",
  },
];
