export const COMPANY = {
  name: "Arvernus",
  fullName: "Arvernus GmbH",
  tagline: "Ihre Experten für Wärmepumpen & Photovoltaik",
  foundedYear: 2014,
  phone: "+49 123 456789",
  phoneDisplay: "0123 456789",
  email: "info@arvernus.de",
  whatsapp: "49123456789",
  website: "https://www.arvernus.de",
  address: {
    street: "Musterstraße 1",
    zip: "12345",
    city: "Musterstadt",
    state: "Bayern",
    country: "Deutschland",
  },
  hours: {
    weekdays: "Mo–Fr: 08:00–18:00",
    saturday: "Sa: 09:00–14:00",
    sunday: "So: Geschlossen",
  },
  social: {
    facebook: "https://facebook.com/arvernus",
    instagram: "https://instagram.com/arvernus",
    linkedin: "https://linkedin.com/company/arvernus",
    twitter: "https://x.com/arvernus",
  },
} as const;

export const STATS = {
  yearsFounded: new Date().getFullYear() - COMPANY.foundedYear,
  projectsCompleted: 1000,
  satisfactionRate: 98,
  maxFoerderung: 70,
  pvCustomers: 15000,
} as const;
