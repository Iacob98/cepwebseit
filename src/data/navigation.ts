import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Photovoltaik", href: "/photovoltaik" },
  { label: "Energiespeicher", href: "/energiespeicher" },
  { label: "Förderung", href: "/foerderung" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Wärmepumpen", href: "/waermepumpen" },
];

function isHidden(href: string, hiddenSlugs: string[]): boolean {
  // href like "/waermepumpen" or "/waermepumpen/luft-wasser-waermepumpe"
  // slug like "waermepumpen"
  return hiddenSlugs.some(
    (slug) => href === `/${slug}` || href.startsWith(`/${slug}/`)
  );
}

export function filterHiddenPages(hiddenSlugs: string[]) {
  if (hiddenSlugs.length === 0) {
    return { mainNav: mainNavigation, footerNav: footerNavigation };
  }

  const filterItems = (items: NavItem[]) =>
    items
      .filter((item) => !isHidden(item.href, hiddenSlugs))
      .map((item) =>
        item.children
          ? { ...item, children: item.children.filter((c) => !isHidden(c.href, hiddenSlugs)) }
          : item
      );

  return {
    mainNav: filterItems(mainNavigation),
    footerNav: {
      services: filterItems(footerNavigation.services),
      company: filterItems(footerNavigation.company),
      resources: filterItems(footerNavigation.resources),
      legal: filterItems(footerNavigation.legal),
    },
  };
}

export const footerNavigation = {
  services: [
    { label: "Photovoltaik", href: "/photovoltaik" },
    { label: "Energiespeicher", href: "/energiespeicher" },
    { label: "Wärmepumpen", href: "/waermepumpen" },
  ],
  company: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Förderung", href: "/foerderung" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  resources: [
    { label: "Energie-Rechner", href: "/energie-rechner" },
    { label: "Ratgeber", href: "/ratgeber" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
