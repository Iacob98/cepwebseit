import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCompany, getSiteSettings } from "@/lib/dal";
import { filterHiddenPages } from "@/data/navigation";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, settings] = await Promise.all([getCompany(), getSiteSettings()]);
  const { mainNav } = filterHiddenPages(settings.hiddenPages);

  return (
    <>
      <Header company={company} navItems={mainNav} />
      <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
      <Footer company={company} hiddenPages={settings.hiddenPages} />
      <MobileBottomBar company={company} />
      <WhatsAppButton company={company} />
      <CookieConsent />
    </>
  );
}
