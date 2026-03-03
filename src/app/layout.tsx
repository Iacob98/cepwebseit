import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@/components/layout/GoogleTagManager";
import { Toaster } from "@/components/ui/Sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CEP Energie – Solar, Wärmepumpen & Energiespeicher | Hennigsdorf",
    template: "%s | CEP Energie",
  },
  description:
    "CEP Clever Energie Power GmbH — Ihr Partner für Photovoltaik, Wärmepumpen und Energiespeicher in Hennigsdorf & Brandenburg. Bis zu 70% Förderung möglich.",
  keywords: [
    "Photovoltaik",
    "Wärmepumpe",
    "Energiespeicher",
    "Solaranlage",
    "Hennigsdorf",
    "Brandenburg",
    "Förderung",
    "KfW",
    "BAFA",
    "Energieberatung",
    "Energieeffizienz",
  ],
  authors: [{ name: "CEP Clever Energie Power GmbH" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "CEP Energie",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GoogleTagManager />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
