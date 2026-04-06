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
    title: "Own Your Future, One Plot at a Time",
    subtitle: "Premium open plots in prime locations — invest with confidence",
    image: "/hero-section.jpg",
  },
  {
    title: "Land That Grows In Value",
    subtitle: "Strategically located plots with high appreciation potential",
    image: "/hero2.jpg",
  },
  {
    title: "Build Your Dreams On Solid Ground",
    subtitle: "Approved land plots with modern infrastructure & amenities",
    image: "/hero.png",
  },
  {
    title: "Design Your Dream Home, Your Way",
    subtitle: "Spacious apartments crafted for comfort, style, and future value",
    image: "/pride-walls-appartments.jpg",
  }
];

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
    <section className="relative h-[90vh] min-h-[700px] max-h-[1000px] overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </motion.div>
      ))}

      {/* Decorative Elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div> */}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight text-transparent bg-gradient-to-r from-rose-200 via-white to-slate-200 bg-clip-text drop-shadow-[0_20px_30px_rgba(0,0,0,0.65)] mb-6">
              {heroSlides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100/90 mb-8 max-w-xl leading-relaxed tracking-wide">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-linear-to-r from-[#c42630] to-[#a61f28] px-8 py-6 text-lg text-white shadow-xl shadow-[#c42630]/25">
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
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Calendar className="h-5 w-5" />
                <span>
                  Book Site Visit
                </span>
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-primary w-10'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator - Centered */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors hidden lg:flex flex-col items-center gap-2 group"
        aria-label="Scroll to projects"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-2 group-hover:border-white/60"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
    </section>
  );
}
