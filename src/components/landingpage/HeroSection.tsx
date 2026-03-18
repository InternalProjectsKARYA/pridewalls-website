'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Subtitles } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-8 max-w-xl leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25">
                <Link href="/#projects">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <Link href="/#contact">
                  Book Site Visit
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

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
