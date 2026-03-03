import type { Service } from "@/types";

export const services: Service[] = [
  {
    title: "Photovoltaik",
    description:
      "Strom vom eigenen Dach — ab 5 ct/kWh statt 37 ct aus dem Netz. Wir planen und installieren Ihre Solaranlage schlüsselfertig, inklusive Anmeldung und Förderantrag.",
    href: "/photovoltaik",
    icon: "sun",
    features: [
      "Strom ab 5 ct/kWh erzeugen",
      "0% Mehrwertsteuer seit 2023",
      "25+ Jahre Modulgarantie*",
      "Schlüsselfertig in 1–3 Tagen",
    ],
    image: "/images/pv-roof-close.jpg",
  },
  {
    title: "Energiespeicher",
    description:
      "Solarstrom rund um die Uhr nutzen. Mit einem Batteriespeicher steigern Sie Ihren Eigenverbrauch auf bis zu 80% — auch abends und nachts.",
    href: "/energiespeicher",
    icon: "battery",
    features: [
      "Eigenverbrauch auf 70–80%* steigern",
      "Notstromversorgung optional",
      "LFP-Technologie: 10.000+ Zyklen",
      "Nachrüstbar zu bestehender PV",
    ],
    image: "/images/pv-house-full.jpg",
  },
  {
    title: "Förderung",
    description:
      "Bis zu 70% staatliche Förderung für Ihre Energiewende. Wir übernehmen die Antragstellung bei KfW und BAFA — damit Sie den maximalen Zuschuss erhalten.",
    href: "/foerderung",
    icon: "piggy-bank",
    features: [
      "Bis zu 70% KfW-Zuschuss für Wärmepumpen*",
      "0% MwSt. auf PV-Anlagen seit 2023",
      "Komplette Antragstellung durch uns",
      "Kostenlose Fördermittelberechnung",
    ],
    image: "/images/pv-roof-close.jpg",
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
