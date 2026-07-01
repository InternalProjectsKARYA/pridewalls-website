'use client';

import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, FileCheck } from 'lucide-react';

const trustItems = [
  { icon: Award, value: '8+', label: 'Years of Excellence' },
  { icon: Shield, value: 'RERA', label: 'Registered' },
  { icon: CheckCircle, value: '100%', label: 'Clear Titles' },
  // { icon: Building2, value: '40+', label: 'Residential Projects' },
  // { icon: Building , value: '5', label: 'Commercial Projects' },
  { icon: FileCheck, value: 'HMDA', label: 'Approved' },
];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-primary">

      {/* ===== Brand red glow background ===== */}
      <div className="pointer-events-none absolute inset-0">
        {/* <div className="absolute -top-20 left-1/3 w-72 h-72 bg-brand-gold/20 blur-[120px]" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-brand-gold/20 blur-[120px]" /> */}

        {/* Moving sheen */}
        <motion.div
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent"
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative container mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-0">

          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative flex h-full min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-center shadow-lg shadow-black/10 backdrop-blur-sm min-[480px]:text-left sm:px-5 xl:justify-start xl:rounded-none xl:border-0 xl:bg-transparent xl:px-6 xl:py-2 xl:shadow-none xl:backdrop-blur-0"
            >
              {/* Divider */}
              {index !== trustItems.length - 1 && (
                <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent" />
              )}

              {/* Icon with glow */}
              <div className="relative flex-shrink-0 mx-auto min-[480px]:mx-0">
                <div className="absolute inset-0 rounded-xl bg-brand-gold/30 blur-md opacity-0 group-hover:opacity-100 transition" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-hover shadow-lg shadow-brand-gold/30 sm:h-12 sm:w-12">
                  <item.icon className="h-5 w-5 text-white sm:h-[22px] sm:w-[22px]" />
                </div>
              </div>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col items-center min-[480px]:items-start">
                <span className="text-lg font-bold leading-none tracking-tight text-white sm:text-xl">
                  {item.value}
                </span>
                <span className="mt-1 text-xs text-white/65 sm:text-sm whitespace-normal break-words">
                  {item.label}
                </span>
              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* ===== Bottom accent line ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

    </section>
  );
}
