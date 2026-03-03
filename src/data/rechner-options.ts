export const gebaeudetypen = [
  { value: "einfamilienhaus", label: "Einfamilienhaus" },
  { value: "doppelhaushaelfte", label: "Doppelhaushälfte" },
  { value: "reihenhaus", label: "Reihenhaus" },
  { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
];

export const eigentuemerOptionen = [
  { value: "eigentuemer", label: "Eigentümer" },
  { value: "kaufinteressent", label: "Kaufinteressent" },
];

export const baujahrOptionen = [
  { value: "vor1970", label: "Vor 1970" },
  { value: "1970-1990", label: "1970–1990" },
  { value: "1990-2010", label: "1990–2010" },
  { value: "nach2010", label: "Nach 2010" },
  { value: "neubau", label: "Neubau" },
];

export const wohnflaecheOptionen = [
  { value: "unter100", label: "Unter 100 m²" },
  { value: "100-150", label: "100–150 m²" },
  { value: "150-200", label: "150–200 m²" },
  { value: "200-300", label: "200–300 m²" },
  { value: "ueber300", label: "Über 300 m²" },
];

export const daemmungOptionen = [
  { value: "gut", label: "Gut gedämmt" },
  { value: "teilweise", label: "Teilweise gedämmt" },
  { value: "schlecht", label: "Schlecht / Nicht gedämmt" },
  { value: "unbekannt", label: "Weiß ich nicht" },
];

export const fensterOptionen = [
  { value: "dreifach", label: "Dreifachverglasung" },
  { value: "zweifach", label: "Zweifachverglasung" },
  { value: "einfach", label: "Einfachverglasung" },
  { value: "unbekannt", label: "Weiß ich nicht" },
];

export const aktuelleHeizungOptionen = [
  { value: "gas", label: "Gasheizung" },
  { value: "oel", label: "Ölheizung" },
  { value: "elektro", label: "Elektroheizung" },
  { value: "fernwaerme", label: "Fernwärme" },
  { value: "holz", label: "Holz/Pellets" },
  { value: "keine", label: "Keine (Neubau)" },
];

export const heizungsalterOptionen = [
  { value: "unter5", label: "Unter 5 Jahre" },
  { value: "5-10", label: "5–10 Jahre" },
  { value: "10-20", label: "10–20 Jahre" },
  { value: "ueber20", label: "Über 20 Jahre" },
  { value: "unbekannt", label: "Weiß ich nicht" },
];

export const warmwasserOptionen = [
  { value: "zentral", label: "Über Heizung (zentral)" },
  { value: "durchlauferhitzer", label: "Durchlauferhitzer" },
  { value: "boiler", label: "Elektrischer Boiler" },
  { value: "solar", label: "Solarthermie" },
];

export const interesseOptionen = [
  { value: "photovoltaik", label: "Photovoltaik (Solaranlage)" },
  { value: "waermepumpe", label: "Wärmepumpe" },
  { value: "speicher", label: "Energiespeicher" },
  { value: "kombi", label: "Kombiniertes System (Solar + WP + Speicher)" },
  { value: "beratung", label: "Umfassende Beratung gewünscht" },
];

export const waermepumpenTypOptionen = [
  { value: "luft-wasser", label: "Luft-Wasser-Wärmepumpe" },
  { value: "sole-wasser", label: "Sole-Wasser-Wärmepumpe" },
  { value: "wasser-wasser", label: "Wasser-Wasser-Wärmepumpe" },
  { value: "beratung", label: "Noch unsicher — Beratung gewünscht" },
];

export const speicherOptionen = [
  { value: "ja", label: "Ja, Speicher gewünscht" },
  { value: "vorhanden", label: "Bereits vorhanden" },
  { value: "nein", label: "Nein, kein Speicher" },
  { value: "beratung", label: "Beratung gewünscht" },
];

export const photovoltaikOptionen = [
  { value: "ja", label: "Ja, interessiert mich" },
  { value: "vorhanden", label: "Bereits vorhanden" },
  { value: "nein", label: "Nein, kein Interesse" },
  { value: "spaeter", label: "Vielleicht später" },
];

export const zeitrahmenOptionen = [
  { value: "sofort", label: "So schnell wie möglich" },
  { value: "3monate", label: "In den nächsten 3 Monaten" },
  { value: "6monate", label: "In den nächsten 6 Monaten" },
  { value: "12monate", label: "Innerhalb eines Jahres" },
  { value: "unbestimmt", label: "Nur informieren" },
];

export const anredeOptionen = [
  { value: "herr", label: "Herr" },
  { value: "frau", label: "Frau" },
];
