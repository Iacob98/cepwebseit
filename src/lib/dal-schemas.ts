import { z } from "zod/v4";

// Company data schema
export const companySchema = z.object({
  name: z.string().min(1),
  fullName: z.string().min(1),
  tagline: z.string().min(1),
  logo: z.string().optional(),
  certificates: z.array(z.object({ name: z.string(), image: z.string().optional() })).optional(),
  foundedYear: z.number().int().min(1900),
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(1),
  website: z.string().url(),
  address: z.object({
    street: z.string().min(1),
    zip: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
  }),
  hours: z.object({
    weekdays: z.string().min(1),
    saturday: z.string().min(1),
    sunday: z.string().min(1),
  }),
  social: z.object({
    facebook: z.string().url(),
    instagram: z.string().url(),
    linkedin: z.string().url(),
    twitter: z.string().url().optional(),
  }),
  legal: z.object({
    ceo: z.string(),
    registergericht: z.string(),
    registernummer: z.string(),
    ustId: z.string(),
  }).optional(),
  stats: z.object({
    projectsCompleted: z.number().int().min(0),
    satisfactionRate: z.number().int().min(0).max(100),
    maxFoerderung: z.number().int().min(0).max(100),
    pvCustomers: z.number().int().min(0).optional(),
    employees: z.number().int().min(0).optional(),
    dailyInstallations: z.number().int().min(0).optional(),
    montageTeams: z.number().int().min(0).optional(),
    locations: z.number().int().min(0).optional(),
  }),
});

// Testimonial
export const testimonialSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1),
  service: z.string().min(1),
  date: z.string().min(1),
  image: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// Project
export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["waermepumpe", "photovoltaik", "kombiniert", "energiespeicher"]),
  location: z.string().min(1),
  year: z.number().int().min(2000),
  specs: z.array(z.string()),
  image: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// FAQ Item
export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.number().int().min(0).optional(),
});

// FAQ by category
export const faqSchema = z.object({
  general: z.array(faqItemSchema),
  waermepumpen: z.array(faqItemSchema),
  photovoltaik: z.array(faqItemSchema),
  foerderung: z.array(faqItemSchema),
  energiespeicher: z.array(faqItemSchema).optional(),
});

// Partner
export const partnerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  logo: z.string().min(1),
  featured: z.boolean().optional(),
  description: z.string().optional(),
  badge: z.string().optional(),
  featuredText: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  order: z.number().int().min(0).optional(),
});

// Team member
export const teamMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// Timeline event
export const timelineEventSchema = z.object({
  id: z.string().min(1),
  year: z.number().int().min(1900),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0).optional(),
});

// Article
export const articleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  author: z.string().optional(),
  publishedDate: z.string().min(1),
  image: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

// Hero Slide
export const heroSlideSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().int().min(0).optional(),
});

// Service
export const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  icon: z.string().min(1),
  features: z.array(z.string()),
  image: z.string().optional(),
});

// Waermepumpen type
export const waermepumpenTypeSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  advantages: z.array(z.string()),
  cop: z.string().min(1),
  idealFor: z.string().min(1),
});

export const servicesDataSchema = z.object({
  services: z.array(serviceSchema),
  waermepumpenTypes: z.array(waermepumpenTypeSchema),
});

// Page content - flexible key-value for each page section
export const pageSectionSchema = z.record(z.string(), z.unknown());

export const pageContentSchema = z.record(z.string(), pageSectionSchema);
export const pagesSchema = z.record(z.string(), pageContentSchema);

// Email settings
export const emailSettingsSchema = z.object({
  subject: z.string().min(1),
  logo: z.string().optional(),
  headerTitle: z.string().min(1),
  headerSubtitle: z.string().optional(),
  greeting: z.string().min(1),
  bodyText: z.string().min(1),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  closing: z.string().min(1),
  footerText: z.string().optional(),
  headerColor: z.string().min(1),
});

// Site settings (hidden pages, etc.)
export const siteSettingsSchema = z.object({
  hiddenPages: z.array(z.string()),
});

// Export types
export type CompanyData = z.infer<typeof companySchema>;
export type TestimonialData = z.infer<typeof testimonialSchema>;
export type ProjectData = z.infer<typeof projectSchema>;
export type FAQItemData = z.infer<typeof faqItemSchema>;
export type FAQData = z.infer<typeof faqSchema>;
export type HeroSlideData = z.infer<typeof heroSlideSchema>;
export type PartnerData = z.infer<typeof partnerSchema>;
export type TeamMemberData = z.infer<typeof teamMemberSchema>;
export type TimelineEventData = z.infer<typeof timelineEventSchema>;
export type ArticleData = z.infer<typeof articleSchema>;
export type ServiceData = z.infer<typeof serviceSchema>;
export type WaermepumpenTypeData = z.infer<typeof waermepumpenTypeSchema>;
export type ServicesData = z.infer<typeof servicesDataSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;
export type PagesData = z.infer<typeof pagesSchema>;
export type EmailSettingsData = z.infer<typeof emailSettingsSchema>;
export type SiteSettingsData = z.infer<typeof siteSettingsSchema>;

// Contact submission
export const contactSubmissionSchema = z.object({
  id: z.string().min(1),
  anrede: z.string(),
  vorname: z.string(),
  nachname: z.string(),
  email: z.string(),
  telefon: z.string().optional(),
  nachricht: z.string(),
  createdAt: z.string(),
  read: z.boolean().optional(),
});

// Rechner submission
export const rechnerSubmissionSchema = z.object({
  id: z.string().min(1),
  gebaeudetyp: z.string(),
  eigentuemer: z.string(),
  baujahr: z.string(),
  wohnflaeche: z.string(),
  daemmung: z.string(),
  fenster: z.string(),
  aktuelleHeizung: z.string(),
  heizungsalter: z.string(),
  warmwasser: z.string(),
  interesse: z.string().optional(),
  waermepumpentyp: z.string(),
  speicher: z.string().optional(),
  photovoltaik: z.string(),
  zeitrahmen: z.string(),
  anrede: z.string(),
  vorname: z.string(),
  nachname: z.string(),
  email: z.string(),
  telefon: z.string(),
  strasse: z.string(),
  plz: z.string(),
  ort: z.string(),
  nachricht: z.string().optional(),
  createdAt: z.string(),
  read: z.boolean().optional(),
});

// Partner submission
export const partnerSubmissionSchema = z.object({
  id: z.string().min(1),
  firmenname: z.string(),
  ansprechpartner: z.string(),
  email: z.string(),
  telefon: z.string().optional(),
  website: z.string().optional(),
  branche: z.string(),
  region: z.string(),
  nachricht: z.string(),
  createdAt: z.string(),
  read: z.boolean().optional(),
});

export type ContactSubmissionData = z.infer<typeof contactSubmissionSchema>;
export type RechnerSubmissionData = z.infer<typeof rechnerSubmissionSchema>;
export type PartnerSubmissionData = z.infer<typeof partnerSubmissionSchema>;
