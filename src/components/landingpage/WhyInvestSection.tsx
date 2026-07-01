'use client';

import { motion } from 'framer-motion';
import {
MapPin,
TrendingUp,
Building2,
FileCheck,
ShieldCheck,
Award,
Lightbulb,
Heart,
} from 'lucide-react';
import { investmentHighlights } from '@/lib/project-data';
import { JSX } from 'react';

const iconMap: Record<string, JSX.Element> = {
'map-pin': <MapPin className="h-6 w-6" />,
'trending-up': <TrendingUp className="h-6 w-6" />,
'building-2': <Building2 className="h-6 w-6" />,
'file-check': <FileCheck className="h-6 w-6" />,
'shield-check': <ShieldCheck className="h-6 w-6" />,
award: <Award className="h-6 w-6" />,
lightbulb: <Lightbulb className="h-6 w-6" />,
heart: <Heart className="h-6 w-6" />,
};

const trustItems = [
  { icon: ShieldCheck, title: 'RERA Approved', sub: 'All Projects' },
  { icon: FileCheck, title: 'Clear Titles', sub: '100% Documentation' },
  { icon: Award, title: 'Quality Assured', sub: 'Premium Materials' },
  { icon: Building2, title: 'Bank Approved', sub: 'All Major Banks' },
];

export default function WhyInvestSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-12 sm:py-16 lg:py-24">
      {/* Brand glow */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-72 w-72 bg-brand-gold/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 bg-brand-gold/10 blur-[120px]" />
      </div> */}

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand-gold uppercase backdrop-blur sm:px-5 sm:text-sm"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
          >
            Why Invest With Us?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
          >
            We are committed to delivering excellence in every project, ensuring your investment grows with time.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 min-[540px]:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
          {investmentHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative h-full rounded-2xl bg-gradient-to-b from-brand-gold/30 to-transparent p-[1px]"
            >
              <div className="relative flex h-full min-w-0 flex-col rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur transition-all duration-300 group-hover:border-brand-gold/40 group-hover:shadow-xl sm:p-6">
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent" />
                </div>

                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition group-hover:bg-brand-gold group-hover:text-white sm:mb-5 sm:h-14 sm:w-14">
                  {iconMap[highlight.icon] ?? <Building2 className="h-6 w-6" />}
                </div>

                <h3 className="mb-2 text-base font-semibold text-foreground transition group-hover:text-brand-gold sm:text-lg">
                  {highlight.title}
                </h3>

                <p className="text-sm leading-6 text-muted-foreground sm:text-[15px]">
                  {highlight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-brand-gold/40 via-transparent to-brand-gold/40 p-[1px] sm:mt-14 lg:mt-16"
        >
          <div className="rounded-2xl border border-border/50 bg-muted/50 p-4 backdrop-blur sm:p-6 lg:p-7">
            <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-0">
              {trustItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative flex min-w-0 items-center gap-4 rounded-xl border border-border/50 bg-background/70 p-4 text-left sm:p-5 xl:rounded-none xl:border-0 xl:bg-transparent xl:px-6 xl:py-3"
                >
                  {index !== trustItems.length - 1 && (
                    <div className="absolute top-1/2 right-0 hidden h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent xl:block" />
                  )}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition group-hover:bg-brand-gold group-hover:text-white">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground sm:text-base">
                      {item.title}
                    </div>
                    <div className="text-xs leading-5 text-muted-foreground sm:text-sm">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
