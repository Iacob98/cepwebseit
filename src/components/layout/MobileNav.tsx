"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { ChevronDown, Phone } from "lucide-react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  phone?: string;
  phoneDisplay?: string;
  logo?: string;
}

export function MobileNav({ open, onClose, phone, phoneDisplay, logo }: MobileNavProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="flex flex-col p-0 lg:hidden">
        <SheetHeader className="p-4">
          <SheetTitle asChild>
            <Image src={logo || "/logo-horizontal.png"} alt="CEP Energie" width={140} height={38} className="h-8 w-auto" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {mainNavigation.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === item.href ? null : item.href)}
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSubmenu === item.href && "rotate-180",
                      )}
                    />
                  </button>
                  {openSubmenu === item.href && (
                    <div className="ml-4 space-y-1">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                      >
                        Übersicht
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block rounded-lg px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4 space-y-3">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4" />
            {phoneDisplay}
          </a>
          <Button href="/energie-rechner" className="w-full" size="sm" onClick={onClose}>
            Kostenlos berechnen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
