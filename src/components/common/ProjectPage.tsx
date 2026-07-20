'use client';

import { useCallback, useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Building, Home, LandPlot, Store, 
  Check, Share2, Heart, Ruler, Phone, Mail, Calendar,
  Award, FileCheck, TrendingUp, Compass,  Train, Plane, Gem, Leaf, Users, Layout,
  Building2, Maximize,  
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContactForm from './ContactForm';
import LocationHighlights from './LocationHighlights';
import FacilitiesGrid from './FacilitiesGrid';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
import { Project, Facility } from '@/lib/project-interface';
import { companyInfo } from '@/lib/project-data';

const typeIcons: Record<string, React.ReactNode> = {
  plots: <LandPlot className="h-5 w-5" />,
  villas: <Home className="h-5 w-5" />,
  apartments: <Building className="h-5 w-5" />,
  commercial: <Store className="h-5 w-5" />,
};

const statusColors: Record<string, string> = {
  ongoing: 'bg-info/10 text-info border-info/20',
  upcoming: 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-success/10 text-success border-success/20',
};

const formatAreaValue = (project: Project) =>
  project.area.min === project.area.max
    ? `${project.area.min}+`
    : `${project.area.min} - ${project.area.max}`;

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

const getZoneKey = (zone: Project['siteLayout']['zones'][number]) => zone.id ?? zone.name;

export default function ProjectPage({ project }: ProjectPageProps) {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.name,
          text: project.tagline,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    }
  }, [project]);
  const [activeBlock, setActiveBlock] = useState<string | null>(
    project.siteLayout?.zones?.[0] ? getZoneKey(project.siteLayout.zones[0]) : null
  );
  const router = useRouter();
  const primaryPhone = companyInfo.contact.phone[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;
  const activeZone = activeBlock
    ? project.siteLayout?.zones.find((zone) => getZoneKey(zone) === activeBlock) ?? null
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70svh] min-h-[520px] max-h-[700px] sm:h-[60vh] sm:min-h-[500px]">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4">
          <div className="section-shell flex items-start justify-between gap-3 sm:items-center">
            <Button 
              variant="secondary" 
             onClick={() => router.back()}
              className="h-10 shrink-0 bg-white/90 px-3 text-foreground hover:bg-white sm:h-auto sm:px-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="sm:hidden">Back</span>
              <span className="hidden sm:inline">Back to Projects</span>
            </Button>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button variant="secondary" size="icon" className="h-10 w-10 bg-white/90 hover:bg-white" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
          <div className="section-shell">
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-white/80">
                {typeIcons[project.type]}
                <span className="text-sm font-medium capitalize">{project.type}</span>
              </div>
              <Badge className={statusColors[project.status]}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              {project.reraApproved && (
                <Badge variant="outline" className="text-white border-white/50">
                  <Award className="h-3 w-3 mr-1" />
                  RERA Approved
                </Badge>
              )}
            </div>
            <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-6xl">
              {project.name}
            </h1>
            <p className="mb-4 max-w-3xl text-base text-white/80 sm:text-xl md:text-2xl">{project.tagline}</p>
            <div className="flex items-start gap-2 text-white/70 sm:items-center">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
              <span className="text-base sm:text-lg">{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="relative overflow-hidden bg-white shadow-card">

        {/* ===== Brand glow background ===== */}
        {/* <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/3 w-60 h-60 bg-brand-gold/20 blur-[110px]" />
          <div className="absolute -bottom-10 right-1/3 w-60 h-60 bg-brand-gold/20 blur-[110px]" />
        </div> */}

        <div className="section-shell relative py-4 sm:py-5">
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">

            {/* Price */}
            {/* <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-white shadow-card">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {project.priceRange.min} - {project.priceRange.max}
                </div>
                <div className="text-xs text-white/65 md:text-sm">
                  {project.priceRange.currency}
                </div>
              </div>
            </div> */}

            {/* Units */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-primary p-4 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-white shadow-card">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold text-white sm:text-2xl">
                  {project.totalUnits}
                </div>
                <div className="text-xs text-white/65 sm:text-sm">Total Units</div>
              </div>
            </div>

            {/* Project size */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-primary p-4 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-white shadow-card">
                <Maximize className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold text-white sm:text-2xl">
                  {project.projectSize}
                </div>
                <div className="text-xs text-white/65 sm:text-sm">Project Area</div>
              </div>
            </div>

            {/* Plot area */}
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-primary p-4 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-white shadow-card">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl font-bold text-white sm:text-2xl">
                  {formatAreaValue(project)}
                </div>
                <div className="text-xs text-white/65 sm:text-sm">{project.area.unit}</div>
              </div>
            </div>

            {/* RERA */}
            {project.reraNumber && (
              <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-primary p-4 shadow-lg shadow-black/10 backdrop-blur-sm min-[480px]:col-span-2 sm:p-5 xl:col-span-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-white shadow-card">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="break-words text-sm font-bold text-white sm:text-base">
                    {project.reraNumber}
                  </div>
                  <div className="text-xs text-white/65">Approved</div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ===== Bottom accent line ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">

              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                  className="premium-card overflow-hidden"
                >
                <div className="border-b border-border bg-muted/40 p-4 sm:p-6">
                  <h2 className="text-xl font-semibold text-primary sm:text-2xl">Project Overview</h2>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line sm:text-lg">
                    {project.description}
                  </p>
                </div>
              </motion.div>


              {/* ================= Highlights ================= */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="premium-card overflow-hidden"
              >
                <div className="border-b border-border bg-muted/40 p-4 sm:p-6">
                  <h2 className="text-xl font-semibold text-primary sm:text-2xl">
                    Why Choose {project.name}?
                  </h2>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className="flex items-start gap-4 rounded-xl border border-border bg-muted/40 p-4 transition hover:border-primary/20 hover:bg-accent"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                          {highlightIconMap[highlight.icon] || <Check className="h-5 w-5" />}
                        </div>

                        <div>
                          <div className="font-semibold text-foreground">{highlight.title}</div>
                          <div className="text-sm text-muted-foreground">{highlight.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Master Plan / Site Layout */}
              {/* {project.siteLayout && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Master Plan / Site Layout</h2>
                  </div>
                  <div className="p-6">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 group">
                      <Image
                        src={project.siteLayout.image}
                        alt={`${project.name} Site Layout`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {project.siteLayout.description}
                    </p>

                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.siteLayout.zones.map((zone) => (
                        <div
                          key={zone.name}
                          className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                        >
                          <div
                            className="w-5 h-5 rounded-full shrink-0 mt-0.5"
                            style={{ backgroundColor: zone.color }}
                          />
                          <div>
                            <div className="font-medium text-foreground">{zone.name}</div>
                            <div className="text-sm text-muted-foreground">{zone.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )} */}

              {/* Location Highlights */}
              {project.locationHighlights && project.locationHighlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                  <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Location Highlights</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <LocationHighlights highlights={project.locationHighlights} />
                  </div>
                </motion.div>
              )}

              {/* Facilities */}
              {project.facilities && project.facilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                  <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Facilities & Infrastructure</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <FacilitiesGrid facilities={project.facilities as Facility[]} />
                  </div>
                </motion.div>
              )}

              {/* Amenities Gallery */}
              {project.amenities && project.amenities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                   className="overflow-hidden rounded-2xl border border-border bg-card"
                 >
                   <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                     <h2 className="text-xl font-semibold sm:text-2xl">Amenities</h2>
                   </div>
                   <div className="p-4 sm:p-6">
                     <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {project.amenities.map((amenity) => (
                        <div key={amenity.id} className="group relative aspect-square rounded-xl overflow-hidden">
                          {amenity.image ? (
                            <Image
                              src={amenity.image}
                              alt={amenity.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-4xl text-muted-foreground">📷</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="font-medium text-white text-sm">{amenity.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Specifications */}
              {/* {project.specifications && project.specifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Specifications</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {project.specifications.map((spec) => (
                      <div key={spec.id} className="bg-muted/30 rounded-xl p-5">
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {spec.category}
                        </h4>
                        <ul className="space-y-2">
                          {spec.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )} */}

              {/* Project Gallery */}
              {/* {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Project Gallery</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.gallery.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                          <Image
                            src={image}
                            alt={`${project.name} ${index + 1}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )} */}

              {/* Master Plan / Site Layout */}
              {project.siteLayout && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                   className="overflow-hidden rounded-2xl border border-border bg-card"
                 >
                   <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                     <h2 className="text-xl font-semibold sm:text-2xl">
                       Master Plan / Site Layout
                     </h2>
                   </div>

                   <div className="p-4 sm:p-6">

                     {/* ===== Master Plan Image ===== */}
                     <div className="group relative mb-6 aspect-[4/3] overflow-hidden rounded-xl sm:mb-8 sm:aspect-[16/10]">
                       <Image
                        src={project.siteLayout.image}
                        alt={`${project.name} Site Layout`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Floor Plans */}
              {project.floorPlans && project.floorPlans.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                   className="overflow-hidden rounded-2xl border border-border bg-card"
                 >
                   <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                     <h2 className="text-xl font-semibold sm:text-2xl">Floor Plans & Plot Layouts</h2>
                   </div>
                  {/* <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.floorPlans.map((plan) => (
                        <div key={plan.id} className="bg-muted/30 rounded-xl overflow-hidden group">
                          <div className="relative h-48">
                            <Image
                              src={plan.image}
                              alt={plan.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <div className="font-semibold text-foreground">{plan.name}</div>
                            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Ruler className="h-4 w-4" />
                                {plan.type}
                              </span>
                              <span>{plan.area}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* ===== TAB BAR ===== */}
                  <div className="mb-6 w-full p-4 sm:p-6">
                      <div className="grid w-full grid-cols-1 gap-2 rounded-xl bg-muted p-2 shadow-card sm:grid-cols-2 xl:grid-cols-3">
                        {project.siteLayout.zones.map((zone) => {
                          const zoneKey = getZoneKey(zone);
                          const active = activeBlock === zoneKey;
                          return (
                            <button
                              key={zoneKey}
                              onClick={() => setActiveBlock(zoneKey)}
                              className={`w-full rounded-lg px-4 py-2.5 text-center text-sm font-medium transition-all duration-200
                                ${active ? 'bg-primary text-white shadow-card': 'text-muted-foreground hover:bg-accent hover:text-primary'}`}
                            >
                              {zone.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* ===== ACTIVE BLOCK IMAGE ===== */}
                    {activeBlock && (
                      <div className="mb-4 px-4 text-center text-sm sm:px-6 sm:text-base">
                        <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
                          {activeZone?.blockname}
                        </h3>
                        {activeZone?.description}
                      </div>
                    )}

                    {activeZone?.image && (
                      <div className="relative mx-4 mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border sm:mx-6 sm:mb-6 sm:aspect-[16/10]">
                        
                        <img
                          key={activeBlock}
                          src={activeZone.image}
                          alt={activeZone.name}
                          className="w-full h-full object-contain transition-opacity duration-300"
                        />
                      </div>
                    )}
                </motion.div>
              )}

              
              {/* Location Map */}
              {project.mapEmbedUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="border-b border-border bg-muted/30 p-4 sm:p-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">Location Map</h2>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="h-[320px] overflow-hidden rounded-xl sm:h-[400px]">
                      <iframe
                        src={project.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${project.name} Location`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              

              {/* Approvals */}
              {/* {project.approvals && project.approvals.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Approvals & Certifications</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {project.approvals.map((approval, index) => (
                        <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                          <FileCheck className="h-4 w-4 mr-2" />
                          {approval}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )} */}
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-36">

                {/* ================= CONTACT FORM CARD ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="premium-card overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-primary p-4 text-white sm:p-6">
                    <h3 className="mb-2 text-xl font-semibold">
                      Interested in this project?
                    </h3>
                    <p className="text-sm text-white/90">
                      Fill out the form and our team will contact you shortly.
                    </p>
                  </div>

                  {/* Form */}
                  <div className="p-4 sm:p-6">
                    <ContactForm projectName={project.name} showProjectSelect={false} />
                  </div>
                </motion.div>

                {/* ================= QUICK CONTACT ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="premium-card p-4 sm:p-6"
                >
                  <h4 className="font-semibold text-foreground mb-4">Quick Contact</h4>

                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 break-all text-muted-foreground transition hover:text-primary sm:break-normal"
                    >
                      <Phone className="h-5 w-5" />
                      <span>+91 70364 45500</span>
                    </a>

                    <a
                      href="mailto:sales@pridewalls.com"
                      className="flex items-center gap-3 break-all text-muted-foreground transition hover:text-primary sm:break-normal"
                    >
                      <Mail className="h-5 w-5" />
                      <span>sales@pridewalls.com</span>
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                </motion.div>

                {/* ================= SITE VISIT ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4 text-center sm:p-6"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    Schedule a Site Visit
                  </h4>

                  <p className="text-sm text-muted-foreground mb-4">
                    Experience the project firsthand with our guided site visits.
                  </p>

                  <Button
                    type="button"
                    onClick={() => setIsSiteVisitOpen(true)}
                    variant="accent"
                    className="w-full"
                  >
                    Book Site Visit
                  </Button>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
        <SiteVisitDialog
          open={isSiteVisitOpen}
          onOpenChange={setIsSiteVisitOpen}
          phoneHref={phoneHref}
          whatsappHref={whatsappHref}
          sourceLabel="Project page site visit request."
          projectName={project.name}
        />
      </section>
    </div>
  );
}
