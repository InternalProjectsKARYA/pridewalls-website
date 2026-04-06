'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Compass,
  FileCheck,
  Gem,
  Home,
  LandPlot,
  Layout,
  Leaf,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Plane,
  Ruler,
  Share2,
  Store,
  Train,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';
import FacilitiesGrid from './FacilitiesGrid';
import ImageCarousel from './ImageCarousel';
import LocationHighlights from './LocationHighlights';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
import { companyInfo } from '@/lib/project-data';
import { Project } from '@/lib/project-interface';

const typeIcons: Record<Project['type'], React.ReactNode> = {
  plots: <LandPlot className="h-5 w-5" />,
  villas: <Home className="h-5 w-5" />,
  apartments: <Building className="h-5 w-5" />,
  commercial: <Store className="h-5 w-5" />,
};

const statusBadgeStyles: Record<Project['status'], string> = {
  ongoing: 'bg-[#7a2430] text-white border-transparent',
  upcoming: 'bg-[#d8b37a] text-[#2f1f16] border-transparent',
  completed: 'bg-[#31424f] text-white border-transparent',
};

const highlightIconMap: Record<string, React.ReactNode> = {
  'map-pin': <MapPin className="h-5 w-5" />,
  'trending-up': <TrendingUp className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  'building-2': <Building2 className="h-5 w-5" />,
  'file-check': <FileCheck className="h-5 w-5" />,
  train: <Train className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  building: <Building className="h-5 w-5" />,
  gem: <Gem className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  'check-circle': <Check className="h-5 w-5" />,
  leaf: <Leaf className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  layout: <Layout className="h-5 w-5" />,
};

interface ProjectPageProps {
  project: Project;
}

function formatPriceRange(project: Project) {
  return `${project.priceRange.min} - ${project.priceRange.max} ${project.priceRange.currency}`;
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function SectionCard({
  id,
  title,
  children,
  eyebrow,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section id={id} className="estate-panel scroll-mt-30 overflow-hidden rounded-[2rem]">
      <div className="border-b border-[#ded1c4] bg-[linear-gradient(90deg,rgba(122,36,48,0.08),rgba(185,152,90,0.06))] px-5 py-5 sm:px-6">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-3xl text-foreground">{title}</h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [activeZoneKey, setActiveZoneKey] = useState<string | null>(
    project.siteLayout.zones[0]?.id ?? project.siteLayout.zones[0]?.name ?? null
  );
  const router = useRouter();

  const primaryPhone = companyInfo.contact.phone[0];
  const primaryEmail = companyInfo.contact.email[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;

  const handleShare = useCallback(async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: project.name,
          text: project.tagline,
          url: currentUrl,
        });
        return;
      } catch {
        // user cancelled
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(currentUrl);
      } catch {
        // ignore clipboard fallback failures
      }
    }
  }, [project.name, project.tagline]);

  const approvals = useMemo(
    () => project.approvals.filter((approval) => approval.trim().length > 0),
    [project.approvals]
  );

  const sizeRangeLabel =
    project.type === 'plots'
      ? 'Plot Size Range'
      : project.type === 'villas'
      ? 'Villa Size Range'
      : project.type === 'apartments'
      ? 'Apartment Range'
      : 'Space Range';

  const inventoryLabel =
    project.type === 'plots'
      ? 'Plots'
      : project.type === 'villas'
      ? 'Villas'
      : project.type === 'apartments'
      ? 'Homes'
      : 'Units';

  const activeZone =
    project.siteLayout.zones.find(
      (zone) => (zone.id ?? zone.name) === activeZoneKey
    ) ?? null;

  const sectionLinks = [
    { id: 'project-overview', label: 'Overview', enabled: true },
    { id: 'project-gallery', label: 'Gallery', enabled: project.gallery.length > 0 },
    { id: 'project-location', label: 'Location', enabled: project.locationHighlights.length > 0 },
    { id: 'project-facilities', label: 'Facilities', enabled: !!project.facilities?.length },
    { id: 'project-specifications', label: 'Specifications', enabled: project.specifications.length > 0 },
    { id: 'project-amenities', label: 'Amenities', enabled: !!project.amenities?.length },
    { id: 'project-layout', label: 'Layout', enabled: !!project.siteLayout },
    { id: 'project-plans', label: 'Plans', enabled: !!project.floorPlans?.length },
    { id: 'project-map', label: 'Map', enabled: !!project.mapEmbedUrl },
  ].filter((item) => item.enabled);

  const projectSnapshot = [
    { label: 'Starting Range', value: formatPriceRange(project), icon: <Gem className="h-5 w-5" /> },
    { label: 'Project Size', value: project.projectSize, icon: <Maximize className="h-5 w-5" /> },
    { label: sizeRangeLabel, value: `${project.area.min} - ${project.area.max} ${project.area.unit}`, icon: <Ruler className="h-5 w-5" /> },
    { label: inventoryLabel, value: `${project.totalUnits} ${inventoryLabel.toLowerCase()}`, icon: <Building2 className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[38rem] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,11,0.22)_0%,rgba(17,12,11,0.52)_38%,rgba(17,12,11,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,152,90,0.14),transparent_22rem)]" />

        <div className="relative container mx-auto px-4 pb-12 pt-5 sm:px-6 sm:pb-14 sm:pt-6">
          <div className="flex items-start justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => router.back()}
              className="rounded-full bg-white/90 px-4 text-foreground hover:bg-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-full bg-white/90 px-4 text-foreground hover:bg-white"
              >
                <a href={phoneHref}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-18 max-w-4xl sm:mt-24 lg:mt-28">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${statusBadgeStyles[project.status]} px-3 py-1.5`}>
                {project.status === 'ongoing'
                  ? 'Now Selling'
                  : project.status === 'upcoming'
                  ? 'Upcoming'
                  : 'Completed'}
              </Badge>
              <Badge className="border border-white/16 bg-white/10 px-3 py-1.5 text-white backdrop-blur">
                {typeIcons[project.type]}
                <span className="ml-2 capitalize">{project.type}</span>
              </Badge>
              {project.reraApproved ? (
                <Badge className="border border-white/16 bg-white/10 px-3 py-1.5 text-white backdrop-blur">
                  <Award className="mr-1.5 h-3.5 w-3.5" />
                  RERA aligned
                </Badge>
              ) : null}
              {project.hmdaApproved ? (
                <Badge className="border border-white/16 bg-white/10 px-3 py-1.5 text-white backdrop-blur">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  HMDA aware
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-6 text-5xl text-white sm:text-6xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/74 sm:text-xl">
              {project.tagline}
            </p>

            <div className="mt-6 flex items-start gap-3 text-white/74">
              <MapPin className="mt-1 h-5 w-5 shrink-0" />
              <span className="text-base sm:text-lg">{project.location}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                size="lg"
                onClick={() => setIsSiteVisitOpen(true)}
                className="h-12 rounded-full bg-[#7a2430] px-7 text-white hover:bg-[#69202a]"
              >
                <Calendar className="h-4 w-4" />
                Book Site Visit
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('project-overview')}
                className="h-12 rounded-full border-white/18 bg-white/10 px-7 text-white hover:bg-white/16"
              >
                Explore Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[#2b1c18] bg-[linear-gradient(90deg,#17100f_0%,#211714_50%,#17100f_100%)]">
        <div className="container mx-auto px-4 py-5 sm:px-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {projectSnapshot.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7a2430] text-white shadow-[0_14px_24px_rgba(122,36,48,0.26)]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8b37a]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-[4.5rem] z-30 border-b border-[#ded1c4] bg-[#fbf7f1]/90 backdrop-blur-xl">
        <div className="container mx-auto flex gap-3 overflow-x-auto px-4 py-3 sm:px-6">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="whitespace-nowrap rounded-full border border-[#d9cdc0] bg-white px-4 py-2 text-sm font-semibold text-[#4e4037] transition hover:border-[#b9985a] hover:text-[#7a2430]"
            >
              {section.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <SectionCard id="project-overview" title="Project Overview" eyebrow="Snapshot">
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/76 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                    Project Essentials
                  </p>
                  <div className="mt-5 grid gap-3">
                     <FactRow label="Location" value={project.location} />
                     <FactRow label="Starting Range" value={formatPriceRange(project)} />
                     <FactRow label="Project Size" value={project.projectSize} />
                     <FactRow
                       label={sizeRangeLabel}
                       value={`${project.area.min} - ${project.area.max} ${project.area.unit}`}
                     />
                    {project.reraNumber ? (
                      <FactRow label="RERA Number" value={project.reraNumber} />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="rounded-[1.5rem] border border-[#d9cdc0] bg-[#fbf4ec] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7a2430]/10 text-[#7a2430]">
                        {highlightIconMap[highlight.icon] ?? <Check className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="text-2xl text-foreground">{highlight.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {project.gallery.length ? (
              <SectionCard id="project-gallery" title="Project Gallery" eyebrow="Visual Tour">
                <div className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/76 p-3 sm:p-4">
                  <ImageCarousel images={project.gallery} alt={project.name} />
                </div>
              </SectionCard>
            ) : null}

            {project.locationHighlights.length > 0 ? (
              <SectionCard id="project-location" title="Location Highlights" eyebrow="Connectivity">
                <LocationHighlights highlights={project.locationHighlights} />
              </SectionCard>
            ) : null}

            {project.facilities?.length ? (
              <SectionCard id="project-facilities" title="Facilities & Infrastructure" eyebrow="Project Backbone">
                <FacilitiesGrid facilities={project.facilities} />
              </SectionCard>
            ) : null}

            {project.specifications.length ? (
              <SectionCard
                id="project-specifications"
                title="Specifications & Planning Notes"
                eyebrow="Technical Snapshot"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {project.specifications.map((specification) => (
                    <article
                      key={specification.id}
                      className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/78 p-5"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                        {specification.category}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {specification.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7a2430]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {project.amenities?.length ? (
              <SectionCard id="project-amenities" title="Lifestyle Amenities" eyebrow="Family Living">
                <div className="grid gap-4 min-[520px]:grid-cols-2 xl:grid-cols-4">
                  {project.amenities.map((amenity) => (
                    <article
                      key={amenity.id}
                      className="overflow-hidden rounded-[1.5rem] border border-[#d9cdc0] bg-white/76"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        {amenity.image ? (
                          <Image
                            src={amenity.image}
                            alt={amenity.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[#f6efe6] text-[#8b6c45]">
                            <Gem className="h-8 w-8" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,11,0.06)_0%,rgba(17,12,11,0.12)_34%,rgba(17,12,11,0.86)_100%)]" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <h3 className="text-xl text-white">{amenity.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm leading-7 text-muted-foreground">
                          {amenity.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>
            ) : null}

            <SectionCard id="project-layout" title="Master Plan & Site Layout" eyebrow="Layout Understanding">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d9cdc0] bg-white/76">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.siteLayout.image}
                    alt={`${project.name} site layout`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {project.siteLayout.description}
              </p>

              {project.siteLayout.zones.length ? (
                <div className="mt-6">
                  <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                    {project.siteLayout.zones.map((zone) => {
                      const zoneKey = zone.id ?? zone.name;
                      const active = activeZoneKey === zoneKey;

                      return (
                        <button
                          key={zoneKey}
                          onClick={() => setActiveZoneKey(zoneKey)}
                          className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm font-semibold transition ${
                            active
                              ? 'border-[#7a2430] bg-[#7a2430] text-white'
                              : 'border-[#d9cdc0] bg-white text-[#4e4037] hover:border-[#b9985a] hover:text-[#7a2430]'
                          }`}
                        >
                          {zone.name}
                        </button>
                      );
                    })}
                  </div>

                  {activeZone ? (
                    <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                      <div className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/76 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                          Active Block
                        </p>
                        <h3 className="mt-3 text-3xl text-foreground">
                          {activeZone.blockname || activeZone.name}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {activeZone.description}
                        </p>
                      </div>

                      {activeZone.image ? (
                        <div className="overflow-hidden rounded-[1.5rem] border border-[#d9cdc0] bg-white/76">
                          <div className="relative aspect-[16/10]">
                            <img
                              src={activeZone.image}
                              alt={activeZone.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-[1.5rem] border border-[#d9cdc0] bg-white/76 p-5">
                          <p className="text-sm leading-7 text-muted-foreground">
                            This zone is currently described through planning notes
                            rather than a dedicated layout image. The section still
                            helps buyers understand how the site is organised.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </SectionCard>

            {project.floorPlans?.length ? (
              <SectionCard id="project-plans" title="Floor Plans & Layouts" eyebrow="Plan View">
                <div className="grid gap-4 md:grid-cols-2">
                  {project.floorPlans.map((plan) => (
                    <article
                      key={plan.id}
                      className="overflow-hidden rounded-[1.5rem] border border-[#d9cdc0] bg-white/76"
                    >
                      <div className="relative h-64">
                        <Image
                          src={plan.image}
                          alt={plan.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-2xl text-foreground">{plan.name}</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full border border-[#d9cdc0] bg-[#f6efe6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f5f55]">
                            {plan.type}
                          </span>
                          <span className="rounded-full border border-[#d9cdc0] bg-[#f6efe6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f5f55]">
                            {plan.area}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {project.mapEmbedUrl ? (
              <SectionCard id="project-map" title="Location Map" eyebrow="Site Positioning">
                <div className="overflow-hidden rounded-[1.5rem] border border-[#d9cdc0] bg-white/76">
                  <div className="h-[340px] sm:h-[420px]">
                    <iframe
                      src={project.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${project.name} location`}
                    />
                  </div>
                </div>
              </SectionCard>
            ) : null}
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="estate-panel overflow-hidden rounded-[2rem]"
              >
                <div className="bg-[linear-gradient(90deg,#7a2430,#8f3742)] px-5 py-6 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/74">
                    Project Enquiry
                  </p>
                  <h3 className="mt-3 text-3xl text-white">Interested in this project?</h3>
                  <p className="mt-3 text-sm leading-7 text-white/74">
                    Share your details and the team will guide you through pricing,
                    availability, and the next best step.
                  </p>
                </div>
                <div className="p-5 sm:p-6">
                  <ContactForm projectName={project.name} showProjectSelect={false} />
                </div>
              </motion.div>

              <div className="estate-panel rounded-[2rem] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                  Quick Connect
                </p>
                <div className="mt-5 space-y-4">
                  <a
                    href={phoneHref}
                    className="flex items-center gap-3 rounded-[1.25rem] border border-[#d9cdc0] bg-white/78 px-4 py-4 text-sm font-semibold text-[#4e4037] transition hover:border-[#b9985a] hover:text-[#7a2430]"
                  >
                    <Phone className="h-5 w-5" />
                    {primaryPhone}
                  </a>
                  <a
                    href={`mailto:${primaryEmail}`}
                    className="flex items-center gap-3 rounded-[1.25rem] border border-[#d9cdc0] bg-white/78 px-4 py-4 text-sm font-semibold text-[#4e4037] transition hover:border-[#b9985a] hover:text-[#7a2430]"
                  >
                    <Mail className="h-5 w-5" />
                    {primaryEmail}
                  </a>
                </div>

                <div className="mt-5 border-t border-[#ded1c4] pt-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {companyInfo.contact.officeHours}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#d6bf9e] bg-[linear-gradient(180deg,rgba(216,179,122,0.16),rgba(122,36,48,0.06))] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                  Shortlist Faster
                </p>
                <h3 className="mt-3 text-3xl text-foreground">
                  Schedule a guided site visit
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  The quickest way to understand scale, planning, and access is
                  to see the project in person with the team.
                </p>

                <Button
                  type="button"
                  onClick={() => setIsSiteVisitOpen(true)}
                  className="mt-5 h-12 w-full rounded-full bg-[#7a2430] text-white hover:bg-[#69202a]"
                >
                  Book Site Visit
                </Button>
              </div>

              <div className="estate-panel rounded-[2rem] p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a2430]">
                  Approvals & Trust
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.reraApproved ? (
                    <Badge className="rounded-full border border-[#d9cdc0] bg-[#f6efe6] px-3 py-1.5 text-[#4e4037]">
                      RERA aligned
                    </Badge>
                  ) : null}
                  {project.hmdaApproved ? (
                    <Badge className="rounded-full border border-[#d9cdc0] bg-[#f6efe6] px-3 py-1.5 text-[#4e4037]">
                      HMDA aware
                    </Badge>
                  ) : null}
                  {approvals.map((approval) => (
                    <Badge
                      key={approval}
                      className="rounded-full border border-[#d9cdc0] bg-[#f6efe6] px-3 py-1.5 text-[#4e4037]"
                    >
                      {approval}
                    </Badge>
                  ))}
                </div>

                {project.reraNumber ? (
                  <div className="mt-5 rounded-[1.25rem] border border-[#d9cdc0] bg-white/78 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7a2430]">
                      Registered Number
                    </p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {project.reraNumber}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteVisitDialog
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
        sourceLabel="Project page site visit request."
        projectName={project.name}
      />
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#efe5d8] pb-3 last:border-b-0 last:pb-0">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b6c45]">
        {label}
      </span>
      <span className="max-w-[14rem] text-right text-sm font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}
