import Link from "next/link";
import { getTestimonials, getProjects, getTeam, getTimeline, getFAQ, getArticles, getHeroSlides, getContactSubmissions, getRechnerSubmissions } from "@/lib/dal";

export default async function AdminDashboard() {
  const [testimonials, projects, team, timeline, faq, articles, heroSlides, contactSubs, rechnerSubs] = await Promise.all([
    getTestimonials(),
    getProjects(),
    getTeam(),
    getTimeline(),
    getFAQ(),
    getArticles(),
    getHeroSlides(),
    getContactSubmissions(),
    getRechnerSubmissions(),
  ]);

  const faqCount = faq.general.length + faq.waermepumpen.length + faq.photovoltaik.length + faq.foerderung.length + (faq.energiespeicher?.length ?? 0);

  const contactUnread = contactSubs.filter((s) => !s.read).length;
  const rechnerUnread = rechnerSubs.filter((s) => !s.read).length;

  const stats: { label: string; count: number; href: string; badge?: number }[] = [
    { label: "Kontaktanfragen", count: contactSubs.length, href: "/admin/submissions", badge: contactUnread },
    { label: "Rechner-Anfragen", count: rechnerSubs.length, href: "/admin/submissions", badge: rechnerUnread },
    { label: "Hero Slides", count: heroSlides.length, href: "/admin/hero-slider" },
    { label: "Projekte", count: projects.length, href: "/admin/projects" },
    { label: "FAQ", count: faqCount, href: "/admin/faq" },
    { label: "Bewertungen", count: testimonials.length, href: "/admin/testimonials" },
    { label: "Ratgeber", count: articles.length, href: "/admin/articles" },
    { label: "Team", count: team.length, href: "/admin/team" },
    { label: "Timeline", count: timeline.length, href: "/admin/timeline" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">Willkommen in der CEP Energie Admin-Verwaltung.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="relative rounded-xl border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <p className="text-3xl font-bold text-primary">{stat.count}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            {stat.badge ? (
              <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                {stat.badge} neu
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Schnellzugriff</h2>
          <div className="mt-4 space-y-2">
            <Link href="/admin/submissions" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Neue Anfragen ansehen
            </Link>
            <Link href="/admin/projects/new" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Neues Projekt hinzufügen
            </Link>
            <Link href="/admin/articles/new" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Neuen Artikel schreiben
            </Link>
            <Link href="/admin/services" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Leistungen bearbeiten
            </Link>
            <Link href="/admin/company" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Kontaktdaten bearbeiten
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Website</h2>
          <div className="mt-4 space-y-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Startseite ansehen
            </a>
            <a href="/photovoltaik" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Photovoltaik ansehen
            </a>
            <a href="/energiespeicher" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Energiespeicher ansehen
            </a>
            <a href="/foerderung" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Förderung ansehen
            </a>
            <a href="/ueber-uns" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Über uns ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
