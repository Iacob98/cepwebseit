import fs from "fs/promises";
import path from "path";
import type {
  CompanyData,
  TestimonialData,
  ProjectData,
  FAQData,
  PartnerData,
  TeamMemberData,
  TimelineEventData,
  ArticleData,
  ServicesData,
  PagesData,
  PageContent,
  HeroSlideData,
  ContactSubmissionData,
  RechnerSubmissionData,
  PartnerSubmissionData,
  EmailSettingsData,
} from "./dal-schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Atomic write: write to tmp then rename
async function writeJSON(filename: string, data: unknown): Promise<void> {
  const filePath = path.join(CONTENT_DIR, filename);
  const tmpPath = filePath + ".tmp";
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}

async function readJSON<T>(filename: string): Promise<T | null> {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

// ─── Company ───────────────────────────────────────────────

export async function getCompany(): Promise<CompanyData> {
  const data = await readJSON<CompanyData>("company.json");
  if (data) return data;
  // Fallback to hardcoded
  const { COMPANY, STATS } = await import("@/lib/constants");
  return {
    ...COMPANY,
    stats: {
      projectsCompleted: STATS.projectsCompleted,
      satisfactionRate: STATS.satisfactionRate,
      maxFoerderung: STATS.maxFoerderung,
    },
  };
}

export async function saveCompany(data: CompanyData): Promise<void> {
  await writeJSON("company.json", data);
}

// ─── Testimonials ──────────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialData[]> {
  const data = await readJSON<TestimonialData[]>("testimonials.json");
  if (data) return data;
  const { testimonials } = await import("@/data/testimonials");
  return testimonials.map((t, i) => ({ ...t, id: String(i + 1), order: i }));
}

export async function saveTestimonials(data: TestimonialData[]): Promise<void> {
  await writeJSON("testimonials.json", data);
}

// ─── Projects ──────────────────────────────────────────────

export async function getProjects(): Promise<ProjectData[]> {
  const data = await readJSON<ProjectData[]>("projects.json");
  if (data) return data;
  return [];
}

export async function saveProjects(data: ProjectData[]): Promise<void> {
  await writeJSON("projects.json", data);
}

// ─── FAQ ───────────────────────────────────────────────────

export async function getFAQ(): Promise<FAQData> {
  const data = await readJSON<FAQData>("faq.json");
  if (data) return data;
  const { generalFAQ, waermepumpenFAQ, photovoltaikFAQ, foerderungFAQ } =
    await import("@/data/faq");
  const addIds = (items: { question: string; answer: string }[]) =>
    items.map((item, i) => ({ ...item, id: String(i + 1), order: i }));
  return {
    general: addIds(generalFAQ),
    waermepumpen: addIds(waermepumpenFAQ),
    photovoltaik: addIds(photovoltaikFAQ),
    foerderung: addIds(foerderungFAQ),
  };
}

export async function saveFAQ(data: FAQData): Promise<void> {
  await writeJSON("faq.json", data);
}

// ─── Partners ──────────────────────────────────────────────

export async function getPartners(): Promise<PartnerData[]> {
  const data = await readJSON<PartnerData[]>("partners.json");
  if (data) return data;
  const { partners } = await import("@/data/partners");
  return partners.map((p, i) => ({ ...p, id: String(i + 1), order: i }));
}

export async function savePartners(data: PartnerData[]): Promise<void> {
  await writeJSON("partners.json", data);
}

// ─── Services ──────────────────────────────────────────────

export async function getServices(): Promise<ServicesData> {
  const data = await readJSON<ServicesData>("services.json");
  if (data) return data;
  const { services, waermepumpenTypes } = await import("@/data/services");
  return { services, waermepumpenTypes };
}

export async function saveServices(data: ServicesData): Promise<void> {
  await writeJSON("services.json", data);
}

// ─── Team ──────────────────────────────────────────────────

export async function getTeam(): Promise<TeamMemberData[]> {
  const data = await readJSON<TeamMemberData[]>("team.json");
  if (data) return data;
  return [];
}

export async function saveTeam(data: TeamMemberData[]): Promise<void> {
  await writeJSON("team.json", data);
}

// ─── Timeline ──────────────────────────────────────────────

export async function getTimeline(): Promise<TimelineEventData[]> {
  const data = await readJSON<TimelineEventData[]>("timeline.json");
  if (data) return data;
  return [];
}

export async function saveTimeline(data: TimelineEventData[]): Promise<void> {
  await writeJSON("timeline.json", data);
}

// ─── Articles ───────────────────────────────────────────────

export async function getArticles(): Promise<ArticleData[]> {
  const data = await readJSON<ArticleData[]>("articles.json");
  if (data) return data;
  return [];
}

export async function saveArticles(data: ArticleData[]): Promise<void> {
  await writeJSON("articles.json", data);
}

// ─── Hero Slides ────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlideData[]> {
  const data = await readJSON<HeroSlideData[]>("hero-slides.json");
  if (data) return data;
  return [];
}

export async function saveHeroSlides(data: HeroSlideData[]): Promise<void> {
  await writeJSON("hero-slides.json", data);
}

// ─── Pages ─────────────────────────────────────────────────

export async function getPages(): Promise<PagesData> {
  const data = await readJSON<PagesData>("pages.json");
  if (data) return data;
  return {};
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const pages = await getPages();
  return pages[slug] ?? null;
}

export async function savePages(data: PagesData): Promise<void> {
  await writeJSON("pages.json", data);
}

export async function savePageContent(
  slug: string,
  content: PageContent
): Promise<void> {
  const pages = await getPages();
  pages[slug] = content;
  await writeJSON("pages.json", pages);
}

// ─── Contact Submissions ────────────────────────────────────

export async function getContactSubmissions(): Promise<ContactSubmissionData[]> {
  const data = await readJSON<ContactSubmissionData[]>("contact-submissions.json");
  return data ?? [];
}

export async function saveContactSubmissions(data: ContactSubmissionData[]): Promise<void> {
  await writeJSON("contact-submissions.json", data);
}

// ─── Rechner Submissions ────────────────────────────────────

export async function getRechnerSubmissions(): Promise<RechnerSubmissionData[]> {
  const data = await readJSON<RechnerSubmissionData[]>("rechner-submissions.json");
  return data ?? [];
}

export async function saveRechnerSubmissions(data: RechnerSubmissionData[]): Promise<void> {
  await writeJSON("rechner-submissions.json", data);
}

// ─── Partner Submissions ─────────────────────────────────────

export async function getPartnerSubmissions(): Promise<PartnerSubmissionData[]> {
  const data = await readJSON<PartnerSubmissionData[]>("partner-submissions.json");
  return data ?? [];
}

export async function savePartnerSubmissions(data: PartnerSubmissionData[]): Promise<void> {
  await writeJSON("partner-submissions.json", data);
}

// ─── Email Settings ──────────────────────────────────────────

const DEFAULT_EMAIL_SETTINGS: EmailSettingsData = {
  subject: "Wir haben Ihre Anfrage erhalten — Arvernus GmbH",
  logo: "",
  headerTitle: "Arvernus GmbH",
  headerSubtitle: "Ihre Experten für Wärmepumpen & Photovoltaik",
  greeting: "Vielen Dank für Ihre Anfrage!",
  bodyText: "wir haben Ihre Anfrage erhalten und bedanken uns für Ihr Interesse. Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden, um alles Weitere zu besprechen.",
  contactPhone: "+49 7621 9156-0",
  contactEmail: "info@cep-energie.com",
  closing: "Ihr Arvernus-Team",
  footerText: "Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.",
  headerColor: "#1a7ab5",
};

export async function getEmailSettings(): Promise<EmailSettingsData> {
  const data = await readJSON<EmailSettingsData>("email-settings.json");
  if (data) return data;
  return DEFAULT_EMAIL_SETTINGS;
}

export async function saveEmailSettings(data: EmailSettingsData): Promise<void> {
  await writeJSON("email-settings.json", data);
}
