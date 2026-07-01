'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';
import { companyInfo } from '@/lib/project-data';

const heroSlides = [
  {
    title: 'Premium Spaces For Confident Living',
    subtitle:
      "Residential communities, open plots, and villas planned for long-term value in Hyderabad's growth corridors.",
    image: '/hero-section.jpg',
  },
  {
    title: 'Invest In Land With Clear Potential',
    subtitle:
      'Approved plots in well-connected locations with infrastructure, access, and future appreciation in focus.',
    image: '/hero2.jpg',
  },
  {
    title: 'Build On Solid Ground',
    subtitle:
      'Thoughtfully planned developments with modern amenities, transparent documentation, and dependable guidance.',
    image: '/hero.png',
  },
  {
    title: 'Homes Designed Around Everyday Comfort',
    subtitle:
      'Spacious apartments and villas crafted for natural light, practical layouts, and a refined community lifestyle.',
    image: '/pride-walls-appartments.jpg',
  },
];

const trustItems = ['HMDA planned', 'RERA-aligned process', 'Guided site visits'];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const primaryPhone = companyInfo.contact.phone[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[86vh] min-h-[640px] max-h-[920px] overflow-hidden bg-primary">
      {heroSlides.map((slide, index) => (
        <motion.div
          key={slide.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1.1 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-primary/35" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      ))}

      <div className="relative flex h-full items-center">
        <div className="section-shell">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-2xl border-l-4 border-brand-gold  px-5 py-6 shadow-card  sm:px-7 sm:py-8"
          >
            <span className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              PRIDEWALLS Real Estate
            </span>

            <h1 className="mb-5 text-4xl font-bold leading-[1.05] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="mb-7 max-w-xl text-base leading-8 text-white/86 sm:text-lg md:text-xl">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-7">
                <Link href="/#projects">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => setIsSiteVisitOpen(true)}
                className="border-white/45 bg-white/10 px-7 text-white hover:bg-white hover:text-primary"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Site Visit</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <SiteVisitDialog
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-10 bg-brand-gold'
                : 'w-2 bg-white/45 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={scrollToProjects}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition-colors hover:text-white lg:flex"
        aria-label="Scroll to projects"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-12 w-8 items-start justify-center rounded-full border-2 border-white/40 p-2"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
    </section>
  );
}
