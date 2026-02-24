export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  title: string;
  description: string;
  href: string;
  icon: string;
  features: string[];
}

export interface WaermepumpenType {
  title: string;
  slug: string;
  description: string;
  advantages: string[];
  cop: string;
  idealFor: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  image?: string;
  order?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "waermepumpe" | "photovoltaik" | "kombiniert";
  location: string;
  year: number;
  specs: string[];
  image?: string;
  order?: number;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  order?: number;
}

export interface Partner {
  id?: string;
  name: string;
  logo: string;
  featured?: boolean;
  description?: string;
  badge?: string;
  featuredText?: string;
  benefits?: string[];
  order?: number;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  order?: number;
}

export interface TimelineEvent {
  id?: string;
  year: number;
  title: string;
  description: string;
  order?: number;
}

export interface CompanyData {
  name: string;
  fullName: string;
  tagline: string;
  logo?: string;
  certificates?: { name: string; image?: string }[];
  foundedYear: number;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsapp: string;
  website: string;
  address: {
    street: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter?: string;
  };
  legal?: {
    ceo: string;
    registergericht: string;
    registernummer: string;
    ustId: string;
  };
  stats: {
    projectsCompleted: number;
    satisfactionRate: number;
    maxFoerderung: number;
    pvCustomers?: number;
  };
}

export interface RechnerFormData {
  // Step 1
  gebaeudetyp: string;
  eigentuemer: string;
  // Step 2
  baujahr: string;
  wohnflaeche: string;
  daemmung: string;
  fenster: string;
  // Step 3
  aktuelleHeizung: string;
  heizungsalter: string;
  warmwasser: string;
  // Step 4
  waermepumpentyp: string;
  photovoltaik: string;
  zeitrahmen: string;
  // Step 5
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  nachricht: string;
  datenschutz: boolean;
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author?: string;
  publishedDate: string;
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  order?: number;
}

export interface ContactFormData {
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
  datenschutz: boolean;
}

export interface PartnerFormData {
  firmenname: string;
  ansprechpartner: string;
  email: string;
  telefon: string;
  website: string;
  branche: string;
  region: string;
  nachricht: string;
  datenschutz: boolean;
}
