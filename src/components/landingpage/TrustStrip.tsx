'use client';

import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle, Building2, FileCheck, Building } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">

      {/* ===== Brand red glow background ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 w-72 h-72 bg-[#c42630]/20 blur-[120px]" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-[#c42630]/20 blur-[120px]" />

        {/* Moving sheen */}
        <motion.div
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c42630]/10 to-transparent"
        />
      </div>

      {/* ===== Content ===== */}
      <div className="relative container mx-auto px-4 py-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">

          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative flex items-center justify-center md:justify-start gap-3 px-3 md:px-6"
            >
              {/* Divider */}
              {index !== trustItems.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gradient-to-b from-transparent via-[#c42630]/40 to-transparent" />
              )}

              {/* Icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-xl bg-[#c42630]/30 blur-md opacity-0 group-hover:opacity-100 transition" />

                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-lg shadow-[#c42630]/30">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-none tracking-tight">
                  {item.value}
                </span>
                <span className="text-slate-400 text-xs mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* ===== Bottom accent line ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c42630]/60 to-transparent" />

    </section>
  );
}