"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Inbox,
  Image,
  Wrench,
  FolderOpen,
  HelpCircle,
  BookOpen,
  Star,
  FileText,
  Building2,
  Users,
  Clock,
  Mail,
  Handshake,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/submissions", label: "Anfragen", icon: Inbox },
  { href: "/admin/hero-slider", label: "Hero Slider", icon: Image },
  { href: "/admin/services", label: "Leistungen", icon: Wrench },
  { href: "/admin/projects", label: "Projekte", icon: FolderOpen },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/articles", label: "Ratgeber", icon: BookOpen },
  { href: "/admin/testimonials", label: "Bewertungen", icon: Star },
  { href: "/admin/pages", label: "Seiten-Texte", icon: FileText },
  { href: "/admin/company", label: "Unternehmen", icon: Building2 },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/timeline", label: "Geschichte", icon: Clock },
  { href: "/admin/partners", label: "Partner", icon: Handshake },
  { href: "/admin/email-settings", label: "E-Mail Vorlagen", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-200 bg-white overflow-y-auto">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href="/admin" className="text-lg font-bold text-gray-900">
          CEP <span className="text-primary">Admin</span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ExternalLink className="h-4 w-4" />
          Website ansehen
        </Link>
      </div>
    </aside>
  );
}
