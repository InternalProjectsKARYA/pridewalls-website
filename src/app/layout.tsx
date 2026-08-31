import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from '../components/landingpage/navbar';
import SocialMediaFloating from "@/components/common/SocialMediaFloating";
import Analytics from '@/components/common/Analytics';

import Footer from '@/components/landingpage/Footer';
import { companyInfo, projects } from "@/lib/project-data";
import { Project } from "@/lib/project-interface";
import { NotFoundProvider } from "@/context/NotFoundContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pridewall.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad | RERA Approved",
    template: "%s | PRIDEWALLS - Premium Real Estate in Hyderabad",
  },
  description:
    "PRIDEWALLS builds premium residential communities including HMDA-approved villas, plots, and apartments in Hyderabad. RERA registered, transparent pricing, and guided site visits for luxury living in prime locations.",
  keywords: [
    "PRIDEWALLS",
    "villas in Hyderabad",
    "plots in Hyderabad",
    "apartments in Hyderabad",
    "open plots Hyderabad",
    "HMDA approved projects",
    "RERA registered developer Hyderabad",
    "luxury villas Hyderabad",
    "premium apartments Hyderabad",
    "gated communities Hyderabad",
    "real estate investment Hyderabad",
    "property developers Hyderabad",
    "2 BHK apartments Hyderabad",
    "3 BHK apartments Hyderabad",
    "4 BHK villas Hyderabad",
    "commercial spaces Hyderabad",
    "Ameenpur properties",
    "Rudraram real estate",
    "Hyderabad growth corridors",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "PRIDEWALLS",
    title: "PRIDEWALLS | Premium Villas, Plots & Apartments in Hyderabad | RERA Approved",
    description:
      "Discover premium residential communities with HMDA-approved villas, plots, and apartments in Hyderabad. RERA registered developer offering transparent pricing and luxury living in prime locations.",
    images: [
      {
        url: "/hero-section.jpg",
        width: 1600,
        height: 900,
        alt: "PRIDEWALLS premium residential community with modern villas, plots, and apartments in Hyderabad",
      },
      {
        url: "/pridewalls-logo-mark.png",
        width: 512,
        height: 512,
        alt: "PRIDEWALLS logo - Premium real estate developer in Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRIDEWALLS | Premium Real Estate in Hyderabad | RERA Approved",
    description:
      "Explore luxury villas, plots & apartments by PRIDEWALLS - HMDA approved, RERA registered developer in Hyderabad's prime locations.",
    images: [
      {
        url: "/hero-section.jpg",
        alt: "PRIDEWALLS premium residential projects in Hyderabad",
      }
    ],
    site: "@pridewalls",
    creator: "@pridewalls",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-IN": siteUrl,
    },
  },
  // Additional SEO enhancements
  verification: {
    google: "google-site-verification: your-verification-code-here",
    yandex: "yandex-verification: your-verification-code-here",
  },
  category: "Real Estate Developer",
  classification: "Premium Residential Real Estate",
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
        <NotFoundProvider>
          <Analytics />
          <Navbar />
          {children}
          <SocialMediaFloating />
          <Footer />
        </NotFoundProvider>
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
        
        {/* Enhanced structured data: Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: `${siteUrl}/projects`
              }
            ]
          })}}
        />
        
        {/* Enhanced structured data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: siteUrl,
            name: "PRIDEWALLS",
            description: companyInfo.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/projects?search={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        
        {/* Enhanced structured data: Project Offers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "PRIDEWALLS Properties",
            itemListElement: projects.map((project: Project, index: number) => ({
              "@type": "Offer",
              position: index + 1,
              name: project.name,
              description: project.description,
              category: project.type.charAt(0).toUpperCase() + project.type.slice(1),
              areaServed: "Hyderabad, Telangana, India",
              availability: project.status === "completed" ? "http://schema.org/InStock" : "http://schema.org/PreOrder",
              url: `${siteUrl}/projects/${project.slug}`,
              image: `${siteUrl}${project.coverImage}`,
              itemOffered: {
                "@type": "RealEstateListing",
                name: project.name,
                description: project.description,
                numberOfRooms: project.type === "apartments" ? (project.name.includes("2 BHK") ? 2 : 3) : undefined,
                floorSize: {
                  "@type": "QuantitativeValue",
                  value: project.area.max,
                  unitText: project.area.unit
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: project.location.split(',')[0].trim(),
                  addressRegion: "Telangana",
                  addressCountry: "IN"
                }
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "INR",
                minPrice: project.priceRange.min * (project.priceRange.currency === "Cr" ? 10000000 : 100000),
                maxPrice: project.priceRange.max * (project.priceRange.currency === "Cr" ? 10000000 : 100000),
                price: project.priceRange.min * (project.priceRange.currency === "Cr" ? 10000000 : 100000)
              }
            }))
          })}}
        />
      </body>
    </html>
  );
}
