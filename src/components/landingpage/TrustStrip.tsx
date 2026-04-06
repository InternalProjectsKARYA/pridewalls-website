'use client';

import { motion } from 'framer-motion';
import { Award, Building2, FileCheck, Shield } from 'lucide-react';

const trustItems = [
  { icon: Shield, value: 'Buyer-first', label: 'Guidance at every step' },
  { icon: FileCheck, value: 'Clear process', label: 'Documentation-led experience' },
  { icon: Building2, value: 'Prime corridors', label: 'Hyderabad-focused opportunities' },
  { icon: Award, value: 'Premium intent', label: 'Planning that feels elevated' },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-[#2b1c18] bg-[#17100f]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-3 py-5 min-[560px]:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-4 xl:border-0 xl:bg-transparent xl:px-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7a2430] text-white shadow-[0_12px_24px_rgba(122,36,48,0.25)]">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d8b37a]">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-white/72">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
