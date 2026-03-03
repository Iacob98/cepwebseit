import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-me"
);

function getHiddenPages(): string[] {
  try {
    const filePath = path.join(process.cwd(), "content", "site-settings.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data.hiddenPages) ? data.hiddenPages : [];
  } catch {
    return [];
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect hidden pages to homepage
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/_next")) {
    const hiddenPages = getHiddenPages();
    if (
      hiddenPages.some(
        (slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`)
      )
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Only protect /admin routes (except login)
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get("admin-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico|uploads|.*\\..*).*)"],
};
