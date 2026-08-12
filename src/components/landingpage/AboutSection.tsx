'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <section id="about" className="overflow-x-hidden bg-background py-16 lg:py-24">
      <div className="container mx-auto overflow-hidden px-4">
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
                  <Image
                    src="/pride-walls-appartments.jpg"
                    alt="PRIDEWALLS apartment community exterior"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/villas.jpg"
                    alt="PRIDEWALLS luxury villa homes"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/clubhouse.png"
                    alt="PRIDEWALLS community clubhouse"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/Amenities/Swimming Pool.jpg"
                    alt="Resident swimming pool at a PRIDEWALLS community"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-0 right-4 z-20 translate-y-1/2 rounded-2xl bg-[#C89D1C] px-6
                       py-4 text-centertext-white shadow-xl sm:right-6 sm:px-8 sm:py-5 lg:right-8"
            >
              <div className="text-3xl font-bold leading-none sm:text-4xl">
                8+
              </div>

              <div className="mt-1 text-[11px] font-medium tracking-wide sm:text-xs">
                Years of Excellence
              </div>
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

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 bg-muted/50 rounded-xl hover:bg-brand-gold/5 transition">
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
