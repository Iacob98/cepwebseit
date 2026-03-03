// Data generators for k6 load tests

const firstNames = ["Max", "Anna", "Thomas", "Maria", "Peter", "Lisa", "Stefan", "Julia", "Andreas", "Sabine"];
const lastNames = ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann"];
const cities = ["Lörrach", "Freiburg", "Basel", "Weil am Rhein", "Rheinfelden", "Schopfheim", "Bad Säckingen"];
const streets = ["Hauptstr.", "Bahnhofstr.", "Gartenstr.", "Bergstr.", "Kirchstr.", "Schulstr.", "Waldstr."];
const branches = ["Handwerk", "Elektro", "Sanitär", "Heizung", "Solar", "Bau", "Architektur"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateContactData(index) {
  const vorname = randomItem(firstNames);
  const nachname = randomItem(lastNames);
  return {
    anrede: Math.random() > 0.5 ? "Herr" : "Frau",
    vorname,
    nachname,
    email: `loadtest-${index}-${Date.now()}@test.example.com`,
    telefon: `+49 ${randomInt(100, 999)} ${randomInt(1000000, 9999999)}`,
    nachricht: `Load test contact submission #${index} at ${new Date().toISOString()}`,
  };
}

export function generateRechnerData(index) {
  const vorname = randomItem(firstNames);
  const nachname = randomItem(lastNames);
  return {
    gebaeudetyp: randomItem(["einfamilienhaus", "zweifamilienhaus", "mehrfamilienhaus", "reihenhaus"]),
    eigentuemer: randomItem(["eigentuemer", "mieter"]),
    baujahr: randomItem(["vor-1970", "1970-1990", "1990-2000", "2000-2010", "nach-2010"]),
    wohnflaeche: randomItem(["unter-100", "100-150", "150-200", "ueber-200"]),
    daemmung: randomItem(["gut", "mittel", "schlecht", "unbekannt"]),
    fenster: randomItem(["einfachverglasung", "doppelverglasung", "dreifachverglasung"]),
    aktuelleHeizung: randomItem(["gas", "oel", "elektro", "fernwaerme", "sonstige"]),
    heizungsalter: randomItem(["unter-5", "5-10", "10-15", "15-20", "ueber-20"]),
    warmwasser: randomItem(["heizung", "durchlauferhitzer", "boiler", "solar"]),
    waermepumpentyp: randomItem(["luft-wasser", "sole-wasser", "wasser-wasser"]),
    photovoltaik: randomItem(["ja-vorhanden", "geplant", "kein-interesse"]),
    zeitrahmen: randomItem(["sofort", "3-6-monate", "6-12-monate", "ueber-12-monate"]),
    anrede: Math.random() > 0.5 ? "Herr" : "Frau",
    vorname,
    nachname,
    email: `loadtest-rechner-${index}-${Date.now()}@test.example.com`,
    telefon: `+49 ${randomInt(100, 999)} ${randomInt(1000000, 9999999)}`,
    strasse: `${randomItem(streets)} ${randomInt(1, 200)}`,
    plz: `${randomInt(79000, 79999)}`,
    ort: randomItem(cities),
    nachricht: `Rechner load test #${index}`,
  };
}

export function generatePartnerData(index) {
  return {
    firmenname: `Testfirma ${index} GmbH`,
    ansprechpartner: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
    email: `loadtest-partner-${index}-${Date.now()}@test.example.com`,
    telefon: `+49 ${randomInt(100, 999)} ${randomInt(1000000, 9999999)}`,
    website: `https://testfirma-${index}.example.com`,
    branche: randomItem(branches),
    region: randomItem(cities),
    nachricht: `Partner load test submission #${index}`,
  };
}

export const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";
export const LOADTEST_SECRET = __ENV.LOADTEST_SECRET || "loadtest-secret-dev";

export const defaultHeaders = {
  "Content-Type": "application/json",
  "x-loadtest-secret": LOADTEST_SECRET,
};

export const MARKETING_PAGES = [
  "/",
  "/waermepumpen",
  "/photovoltaik",
  "/ueber-uns",
  "/kontakt",
  "/rechner",
  "/partner",
  "/ratgeber",
  "/faq",
];
