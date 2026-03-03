import { HeroSection } from "@/components/sections/home/HeroSection";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { TrustSignals } from "@/components/sections/home/TrustSignals";
import { FoerderungTeaser } from "@/components/sections/home/FoerderungTeaser";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { PartnersSection } from "@/components/shared/PartnersSection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CTABanner } from "@/components/shared/CTABanner";
import {
  getServices,
  getPageContent,
  getHeroSlides,
  getCompany,
  getTestimonials,
  getPartners,
  getFAQ,
} from "@/lib/dal";

export default async function HomePage() {
  const [servicesData, pageContent, heroSlides, company, testimonials, partners, faqData] =
    await Promise.all([
      getServices(),
      getPageContent("home"),
      getHeroSlides(),
      getCompany(),
      getTestimonials(),
      getPartners(),
      getFAQ(),
    ]);

  const hero = pageContent?.hero as Record<string, string> | undefined;
  const services = pageContent?.services as Record<string, string> | undefined;
  const about = pageContent?.about as Record<string, string> | undefined;
  const foerderung = pageContent?.foerderung as Record<string, string> | undefined;
  const cta = pageContent?.cta as Record<string, string> | undefined;

  const topTestimonials = testimonials
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const homeFAQ = [
    ...faqData.general,
    ...faqData.photovoltaik,
    ...faqData.foerderung,
  ].slice(0, 6);

  return (
    <>
      <HeroSection content={hero} slides={heroSlides} />
      <TrustSignals stats={company.stats} foundedYear={company.foundedYear} />
      <ServicesOverview services={servicesData.services} content={services} />
      <AboutTeaser content={about} />
      <FoerderungTeaser content={foerderung} />

      {/* Kundenstimmen */}
      {topTestimonials.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading
              label="Kundenstimmen"
              title="Das sagen unsere Kunden"
              subtitle="Über 350 zufriedene Kunden in Brandenburg und Berlin vertrauen auf CEP Energie."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {topTestimonials.map((t) => (
                <TestimonialCard key={t.id ?? t.name} testimonial={t} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Partner */}
      <PartnersSection compact partners={partners} />

      {/* FAQ */}
      {homeFAQ.length > 0 && (
        <section className="py-20 bg-muted/30">
          <Container>
            <SectionHeading
              label="FAQ"
              title="Häufige Fragen"
              subtitle="Die wichtigsten Antworten rund um Photovoltaik, Energiespeicher und Förderung."
            />
            <div className="mx-auto max-w-3xl">
              <FAQAccordion items={homeFAQ} />
            </div>
          </Container>
        </section>
      )}

      <CTABanner
        title={cta?.title}
        description={cta?.description}
        image={cta?.image}
      />
    </>
  );
}
