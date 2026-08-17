import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from '../components/landingpage/navbar'
import WhatsAppButton from "@/components/common/WhatsAppButton";
import StickyMobileCTA from '@/components/landingpage/StickyMobileCTA';
import Footer from '@/components/landingpage/Footer'
import { companyInfo } from "@/lib/project-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pridewall.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad",
    template: "%s | PRIDEWALLS",
  },
  description:
    "PRIDEWALLS builds premium residential communities, open plots, villas and commercial spaces in Hyderabad. RERA-aligned process, HMDA-approved projects, transparent pricing and guided site visits.",
  keywords: [
    "PRIDEWALLS",
    "villas in Hyderabad",
    "plots in Hyderabad",
    "apartments in Madhapur",
    "open plots Hyderabad",
    "HMDA approved projects",
    "RERA registered developer Hyderabad",
    "commercial spaces Hyderabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "PRIDEWALLS",
    title: "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad",
    description:
      "Premium residential communities, open plots, villas and commercial spaces in Hyderabad's growth corridors. RERA-aligned process and transparent pricing.",
    images: [
      {
        url: "/hero-section.jpg",
        width: 1600,
        height: 900,
        alt: "PRIDEWALLS premium residential community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad",
    description:
      "Premium residential communities, open plots, villas and commercial spaces in Hyderabad.",
    images: ["/hero-section.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D2659",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
        <StickyMobileCTA />
        <Footer />
        {/* Structured data: site-wide organization / real estate agent */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: companyInfo.name,
              description: companyInfo.description,
              url: siteUrl,
              telephone: companyInfo.contact.phone[0],
              email: companyInfo.contact.email[0],
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Plot No: 19/B, 4th Floor, Progressive Towers, Jaihind Enclave, 100 Feet Road, Ayyappa Society",
                addressLocality: "Madhapur, Hyderabad",
                addressRegion: "Telangana",
                postalCode: "500081",
                addressCountry: "IN",
              },
              openingHours: "Mo-Sa 09:00-19:00",
              sameAs: companyInfo.socialLinks.map((s) => s.url),
            }),
          }}
        />
      </body>
    </html>
  );
}
