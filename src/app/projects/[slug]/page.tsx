// src/app/projects/[slug]/page.tsx

import { projects } from "@/lib/project-data";
import ProjectPage from "@/components/common/ProjectPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pridewall.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: `${project.name} – ${project.tagline} in ${project.location}`,
    description: `${project.name} in ${project.location}. ${project.tagline}. ${project.projectSize} project with ${project.totalUnits} units. ${project.reraNumber ? `RERA: ${project.reraNumber}.` : ""} Contact PRIDEWALLS for pricing, site visits and availability.`,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
    openGraph: {
      type: "website",
      title: `${project.name} – ${project.tagline}`,
      description: `${project.name} in ${project.location}. ${project.projectSize} project. ${project.reraNumber ? `RERA: ${project.reraNumber}.` : ""}`,
      images: [project.coverImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   // ⭐ THIS IS THE FIX

  console.log("slug:", slug);

  const project = projects.find((p) => p.slug === slug);

  console.log("project found:", !!project);

  if (!project) return notFound();

  return (
    <>
      <ProjectPage project={project} />
      {/* Structured data: Residence / Product schema per project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": project.type === "plots" ? "Product" : "Residence",
            name: project.name,
            description: project.description,
            url: `${siteUrl}/projects/${project.slug}`,
            image: project.coverImage,
            address: {
              "@type": "PostalAddress",
              addressLocality: project.location,
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
            offers: {
              "@type": "Offer",
              price: project.priceRange.min,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            ...(project.reraNumber
              ? { additionalProperty: { "@type": "PropertyValue", name: "RERA Registration Number", value: project.reraNumber } }
              : {}),
          }),
        }}
      />
    </>
  );
}