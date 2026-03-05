"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mainNavigation } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";
import type { CompanyData, NavItem } from "@/types";

interface HeaderProps {
  company: CompanyData;
  navItems?: NavItem[];
}

export function Header({ company, navItems }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const items = navItems ?? mainNavigation;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container>
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={company.logo || "/logo-horizontal.png"}
              alt="CEP Energie"
              width={180}
              height={48}
              className="h-10 w-auto lg:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {items.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-2.5 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50 whitespace-nowrap"
                >
                  {item.label}
                  {item.children && (
                    <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.children && openDropdown === item.href && (
                  <div className="absolute left-0 top-full pt-1">
                    <div className="rounded-xl border border-border bg-background p-2 shadow-sm min-w-[250px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${company.phone}`}
              onClick={() => trackPhoneClick("header")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {company.phoneDisplay}
            </a>
            <Button
              href="/energie-rechner"
              size="sm"
              onClick={() => trackCTAClick({ cta_text: "Kostenlos berechnen", cta_location: "header", cta_destination: "/energie-rechner" })}
            >
              Kostenlos berechnen
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-foreground cursor-pointer"
            aria-label="Menü öffnen"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </Container>
    </header>

    <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} phone={company.phone} phoneDisplay={company.phoneDisplay} logo={company.logo} navItems={items} />
  </>
  );
}
