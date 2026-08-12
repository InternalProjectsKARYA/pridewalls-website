import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProjectsBrowser from '@/components/landingpage/ProjectsBrowser';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pridewall.vercel.app";

export const metadata: Metadata = {
  title: "Projects – Villas, Plots, Apartments & Commercial Spaces in Hyderabad",
  description:
    "Browse all PRIDEWALLS projects in Hyderabad. Filter by status (new launch, upcoming, ready to move) and property type (villas, plots, apartments, commercial). RERA-approved developments with transparent pricing.",
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: "PRIDEWALLS Projects – Villas, Plots & Apartments in Hyderabad",
    description:
      "Browse new-launch, upcoming and ready-to-move PRIDEWALLS projects in Hyderabad. Filter by property type.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Page header */}
      <section className="bg-primary pb-16 pt-40 text-white lg:pb-20 lg:pt-44">
        <div className="section-shell text-center">
          <span className="inline-block rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md mb-4">
            Our Portfolio
          </span>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Explore All Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/75">
            Villas, open plots, apartments and commercial spaces across Hyderabad's
            growth corridors. Filter by status or property type.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="section-shell">
          <Suspense fallback={null}>
            <ProjectsBrowser />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
