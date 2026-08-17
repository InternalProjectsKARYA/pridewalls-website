'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Calendar, Users, Ruler } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    value: '8',
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Delivering quality since 2018',
  },
  {
    icon: Users,
    value: '5000',
    suffix: '+',
    label: 'Happy Customers',
    description: 'Families living their dreams',
  },
  {
    icon: Ruler,
    value: '10',
    suffix: 'M+',
    label: 'Sq.ft Developed',
    description: 'Premium construction area',
  },
];

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const startTime = performance.now();

    let animationFrame: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(numericValue * easedProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, numericValue]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-white tracking-tight"
    >
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-30 md:py-32">

      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.03 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop)',
          }}
        />

        {/* Smooth cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/95" />

        {/* Subtle glow */}
        <div className="absolute inset-0 bg-primary/10" />
      </div>

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-9 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-medium text-white backdrop-blur">
            Our Achievements
          </span>

          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Our Legacy of Excellence
          </h2>

          <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
            Over 8 years of trust, quality, and customer satisfaction.
            Building dreams, creating legacies.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25 },
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-5 py-5 text-center backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.10]">

                {/* Subtle sheen */}
                <motion.div
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%' }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/30 bg-white text-brand-gold shadow-card"
                >
                  <stat.icon className="h-6 w-6" />
                </motion.div>

                {/* Number */}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />

                {/* Label */}
                <div className="mt-1 text-base font-semibold text-white">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="mt-1 text-xs text-white/50">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust chip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="mt-8 flex justify-center"
        >
          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs text-white/65 backdrop-blur">
            Trusted by thousands of families across India
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
    </section>
  );
}