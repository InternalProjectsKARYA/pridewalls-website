'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calendar, Building, Users, Ruler } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '8', suffix: '+', label: 'Years of Excellence', description: 'Delivering quality since 2004' },
  // { icon: Building, value: '40', suffix: '+', label: 'Projects Delivered', description: 'Across India & beyond' },
  { icon: Users, value: '1000', suffix: '+', label: 'Happy Customers', description: 'Families living their dreams' },
  { icon: Ruler, value: '1', suffix: 'M+', label: 'Sq.ft Developed', description: 'Premium construction area' },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          setDone(true);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div
      ref={ref}
      className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white transition-transform duration-300 ${
        done ? 'scale-105' : ''
      }`}
    >
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* ⭐ Background image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop)',
          }}
        />

        {/* ⭐ Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0c0e] via-[#240d11]/95 to-[#1a0c0e]" />
      </div>

      {/* ⭐ Glow lights */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c42630]/30 blur-[140px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#c42630]/20 blur-[140px]" />
      </div> */}

      <div className="container mx-auto px-4 relative">

        {/* ⭐ Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 backdrop-blur rounded-full text-white text-sm font-medium mb-4">
            Our Achievements
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Our Legacy of Excellence
          </h2>

          {/* ⭐ underline accent */}
          <div className="mx-auto mt-3 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#c42630] to-transparent" />

          <p className="text-lg text-white/70 max-w-2xl mx-auto mt-4">
            Two decades of trust, quality, and customer satisfaction. Building dreams, creating legacies.
          </p>
        </motion.div>

        {/* ⭐ Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:bg-white/10 transition-all duration-300 overflow-hidden">

                {/* ⭐ sheen */}
                <motion.div
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                />

                {/* ⭐ icon breathing glow */}
                <motion.div
                  animate={{ boxShadow: ['0 0 0px #c42630', '0 0 24px #c42630', '0 0 0px #c42630'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] mb-4 group-hover:scale-110 transition"
                >
                  <stat.icon className="h-7 w-7 text-white" />
                </motion.div>

                <AnimatedCounter value={stat.value} suffix={stat.suffix} />

                <div className="mt-2 text-white font-semibold text-lg">
                  {stat.label}
                </div>

                <div className="mt-1 text-white/50 text-sm">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ⭐ Trust chip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <div className="inline-flex px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 backdrop-blur">
            Trusted by thousands of families across India
          </div>
        </motion.div>
      </div>

      {/* ⭐ Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c42630]/50 to-transparent" />
    </section>
  );
}