export const COMPANY = {
  name: "CEP Energie",
  fullName: "CEP Clever Energie Power GmbH",
  tagline: "Ihre Experten für Photovoltaik & Energiespeicher",
  foundedYear: 2018,
  phone: "+49 3302 2296968",
  phoneDisplay: "03302 2296968",
  email: "info@cep-energie.com",
  whatsapp: "4933022296968",
  website: "https://www.cep-energie.com",
  address: {
    street: "Neuendorfstraße 18 b",
    zip: "16761",
    city: "Hennigsdorf",
    state: "Brandenburg",
    country: "Deutschland",
  },
  hours: {
    weekdays: "Mo–Fr: 08:00–18:00",
    saturday: "Sa: nach Vereinbarung",
    sunday: "So: Geschlossen",
  },
  social: {
    facebook: "https://facebook.com/cepenergie",
    instagram: "https://instagram.com/cepenergie",
    linkedin: "https://linkedin.com/company/cep-energie",
    twitter: "https://x.com/cepenergie",
  },
} as const;

export const STATS = {
  yearsFounded: new Date().getFullYear() - COMPANY.foundedYear,
  projectsCompleted: 350,
  satisfactionRate: 97,
  maxFoerderung: 70,
  pvCustomers: 350,
  employees: 15,
  dailyInstallations: 2,
  montageTeams: 4,
  locations: 1,
} as const;
