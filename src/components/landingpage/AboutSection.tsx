'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Lightbulb, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { companyInfo } from '@/lib/project-data';

const valueIcons: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck className="h-6 w-6" />,
  award: <Award className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
  heart: <Heart className="h-6 w-6" />,
};

export default function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ⭐ Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop"
                    alt="Modern architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop"
                    alt="Luxury villa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=500&fit=crop"
                    alt="Interior design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop"
                    alt="Amenities"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 lg:right-8 bg-brand-gold text-primary-foreground p-6 rounded-2xl shadow-xl"
            >
              <div className="text-4xl font-bold">8+</div>
              <div className="text-sm opacity-80">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* ⭐ Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium mb-4">
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {companyInfo.name}
            </h2>

            <p className="text-muted-foreground mb-6 whitespace-pre-line">
              {companyInfo.description}
            </p>

            {/* ⭐ Mission / Vision */}
            <div className="space-y-4 mb-8">
              <InfoCard title="Who We Are" text={companyInfo.weare} />
              <InfoCard title="Our Design Philosophy" text={companyInfo.design} />
              <InfoCard title="Community Living" text={companyInfo.community} />
            </div>

            {/* ⭐ Values */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {companyInfo.values.map((value) => (
                <div key={value.title} className="group flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition">
                    {valueIcons[value.icon] || <Award className="h-5 w-5" />}
                  </div>

                  <div>
                    <div className="font-semibold text-foreground text-sm">{value.title}</div>
                    <div className="text-xs text-muted-foreground">{value.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ⭐ CTA */}
            <Button asChild className="bg-brand-gold hover:bg-brand-gold-hover text-white">
              <Link href="/#contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ⭐ helpers */

function ImageBlock({ src, h }: { src: string; h: string }) {
  return (
    <div className={`relative ${h} rounded-2xl overflow-hidden`}>
      <img src={src} className="w-full h-full object-cover" />
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 bg-muted/50 rounded-xl hover:bg-brand-gold/5 transition">
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}