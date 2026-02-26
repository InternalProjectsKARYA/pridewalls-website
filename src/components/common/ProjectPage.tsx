'use client';

import { useCallback } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Building, Home, LandPlot, Store, 
  Check, Share2, Heart, Ruler, Phone, Mail, Calendar,
  Award, FileCheck, TrendingUp, Compass,  Train, Plane, Gem, Leaf, Users, Layout,
  IndianRupee, Building2, Maximize,  
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ContactForm from './ContactForm';
import LocationHighlights from './LocationHighlights';
import FacilitiesGrid from './FacilitiesGrid';
import { Project, Facility } from '@/lib/project-interface';

const typeIcons: Record<string, React.ReactNode> = {
  plots: <LandPlot className="h-5 w-5" />,
  villas: <Home className="h-5 w-5" />,
  apartments: <Building className="h-5 w-5" />,
  commercial: <Store className="h-5 w-5" />,
};

const statusColors: Record<string, string> = {
  ongoing: 'bg-green-500/10 text-green-600 border-green-200',
  upcoming: 'bg-amber-500/10 text-amber-600 border-amber-200',
  completed: 'bg-blue-500/10 text-blue-600 border-blue-200',
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

export default function ProjectPage({ project }: ProjectPageProps) {
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
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] max-h-[700px]">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Button 
              variant="secondary" 
             onClick={() => router.back()}
              className="bg-white/90 hover:bg-white text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
              {project.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-4">{project.tagline}</p>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="relative sticky top-0 z-40 overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-xl">

        {/* ===== Brand glow background ===== */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 left-1/3 w-60 h-60 bg-[#c42630]/20 blur-[110px]" />
          <div className="absolute -bottom-10 right-1/3 w-60 h-60 bg-[#c42630]/20 blur-[110px]" />
        </div>

        <div className="relative container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">

            {/* Price */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {project.priceRange.min} - {project.priceRange.max}
                </div>
                <div className="text-xs md:text-sm text-slate-400">
                  {project.priceRange.currency}
                </div>
              </div>
            </div>

            {/* Units */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  {project.totalUnits}
                </div>
                <div className="text-xs md:text-sm text-slate-400">Total Units</div>
              </div>
            </div>

            {/* Project size */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                <Maximize className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  {project.projectSize}
                </div>
                <div className="text-xs md:text-sm text-slate-400">Project Area</div>
              </div>
            </div>

            {/* Plot area */}
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white">
                  {project.area.min} - {project.area.max}
                </div>
                <div className="text-xs md:text-sm text-slate-400">{project.area.unit}</div>
              </div>
            </div>

            {/* RERA */}
            {project.reraNumber && (
              <div className="flex items-center gap-3 justify-center md:justify-start col-span-2 md:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-bold text-white">
                    {project.reraNumber}
                  </div>
                  <div className="text-xs text-slate-400">Approved</div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ===== Bottom accent line ===== */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c42630]/60 to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">

              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#c42630]/10 to-[#c42630]/5">
                  <h2 className="text-2xl font-semibold text-gray-900">Project Overview</h2>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>
              </motion.div>


              {/* ================= Highlights ================= */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#c42630]/10 to-[#c42630]/5">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Why Choose {project.name}?
                  </h2>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className="flex items-start gap-4 p-4 bg-[#c42630]/5 rounded-xl hover:bg-[#c42630]/10 transition"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#c42630]/10 flex items-center justify-center shrink-0 text-[#c42630]">
                          {highlightIconMap[highlight.icon] || <Check className="h-5 w-5" />}
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900">{highlight.title}</div>
                          <div className="text-sm text-gray-600">{highlight.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Master Plan / Site Layout */}
              {project.siteLayout && (
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

                    {/* Zone Legend */}
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
              )}

              {/* Location Highlights */}
              {project.locationHighlights && project.locationHighlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Location Highlights</h2>
                  </div>
                  <div className="p-6">
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
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Facilities & Infrastructure</h2>
                  </div>
                  <div className="p-6">
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
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Amenities</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

              {/* Floor Plans */}
              {project.floorPlans && project.floorPlans.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Floor Plans & Plot Layouts</h2>
                  </div>
                  <div className="p-6">
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
                  </div>
                </motion.div>
              )}

              {/* Specifications */}
              {project.specifications && project.specifications.length > 0 && (
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
              )}

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
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
              )}

              {/* Location Map */}
              {project.mapEmbedUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border"
                >
                  <div className="p-6 border-b border-border bg-muted/30">
                    <h2 className="text-2xl font-semibold">Location Map</h2>
                  </div>
                  <div className="p-6">
                    <div className="rounded-xl overflow-hidden h-[400px]">
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
              {project.approvals && project.approvals.length > 0 && (
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
              )}
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-36 space-y-6">

                {/* ================= CONTACT FORM CARD ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg"
                >
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      Interested in this project?
                    </h3>
                    <p className="text-sm text-white/90">
                      Fill out the form and our team will contact you shortly.
                    </p>
                  </div>

                  {/* Form */}
                  <div className="p-6">
                    <ContactForm projectName={project.name} showProjectSelect={false} />
                  </div>
                </motion.div>

                {/* ================= QUICK CONTACT ================= */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Contact</h4>

                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-gray-600 hover:text-[#c42630] transition"
                    >
                      <Phone className="h-5 w-5" />
                      <span>+91 91771 80333</span>
                    </a>

                    <a
                      href="mailto:sales@pridewalls.com"
                      className="flex items-center gap-3 text-gray-600 hover:text-[#c42630] transition"
                    >
                      <Mail className="h-5 w-5" />
                      <span>sales@pridewalls.com</span>
                    </a>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  className="rounded-2xl border border-[#c42630]/20 bg-[#c42630]/5 p-6 text-center"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Schedule a Site Visit
                  </h4>

                  <p className="text-sm text-gray-600 mb-4">
                    Experience the project firsthand with our guided site visits.
                  </p>

                  <Button className="w-full bg-gradient-to-r from-[#c42630] to-[#a61f28] hover:from-[#d12c37] hover:to-[#b6232d] text-white">
                    Book Site Visit
                  </Button>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
