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

export default function WhyInvestSection() {
return ( <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">

```
  {/* Brand glow */}
  {/* <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#c42532]/10 blur-[120px]" />
    <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-[#c42532]/10 blur-[120px]" />
  </div> */}

  <div className="relative container mx-auto px-4">

    {/* Header */}
    <div className="text-center mb-14">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-5 py-1.5 bg-[#c42532]/10 text-[#c42532] rounded-full text-sm font-medium mb-4 backdrop-blur"
      >
        Why Choose Us
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight"
      >
        Why Invest With Us?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        We are committed to delivering excellence in every project, ensuring
        your investment grows with time.
      </motion.p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      {investmentHighlights.map((highlight, index) => (
        <motion.div
          key={highlight.id}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-[#c42532]/30 to-transparent"
        >
          <div className="relative h-full p-6 rounded-2xl bg-card/80 backdrop-blur border border-border/60 group-hover:border-[#c42532]/40 group-hover:shadow-xl transition-all duration-300">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c42532]/5 via-transparent to-transparent rounded-2xl" />
            </div>

            <div className="relative w-14 h-14 rounded-xl bg-[#c42532]/10 flex items-center justify-center text-[#c42532] mb-5 group-hover:bg-[#c42532] group-hover:text-white transition">
              {iconMap[highlight.icon] ?? <Building2 className="h-6 w-6" />}
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#c42532] transition">
              {highlight.title}
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
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
      className="mt-16 p-[1px] rounded-2xl bg-gradient-to-r from-[#c42532]/40 via-transparent to-[#c42532]/40"
    >
      <div className="p-7 rounded-2xl bg-muted/50 backdrop-blur border border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">

          {[
            { icon: ShieldCheck, title: 'RERA Approved', sub: 'All Projects' },
            { icon: FileCheck, title: 'Clear Titles', sub: '100% Documentation' },
            { icon: Award, title: 'Quality Assured', sub: 'Premium Materials' },
            { icon: Building2, title: 'Bank Approved', sub: 'All Major Banks' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <item.icon className="h-9 w-9 text-[#c42532] group-hover:scale-110 transition" />
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.sub}</div>
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
