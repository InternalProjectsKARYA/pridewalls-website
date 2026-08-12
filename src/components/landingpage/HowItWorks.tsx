'use client';

import { motion } from 'framer-motion';
import { MessagesSquare, CalendarCheck, PenLine, FileCheck2, KeyRound } from 'lucide-react';

const steps = [
  {
    icon: MessagesSquare,
    step: '01',
    title: 'Enquire',
    description:
      'Share your requirements through the contact form, a call, or WhatsApp. Our team responds within 10 minutes.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Site Visit',
    description:
      'Tour the project and experience the location, layouts, and amenities firsthand with our guided site visits.',
  },
  {
    icon: PenLine,
    step: '03',
    title: 'Booking',
    description:
      'Reserve your unit or plot with a booking amount and receive the allotment letter and agreement details.',
  },
  {
    icon: FileCheck2,
    step: '04',
    title: 'Documentation & Loan Assistance',
    description:
      'We guide you through agreements, registration, and documentation, with home loan assistance from partner banks.',
  },
  {
    icon: KeyRound,
    step: '05',
    title: 'Possession',
    description:
      'Complete the formalities, receive your keys, and move into a home built with quality and care.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="eyebrow mb-4">Simple Process</span>
          <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From your first enquiry to handing over the keys — here is exactly what
            to expect when you buy with PRIDEWALLS.
          </p>
        </motion.div>

        {/* Steps: horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[-2rem] h-px bg-gradient-to-r from-brand-gold/60 to-brand-gold/20" />
              )}

              <div className="group flex h-full flex-col items-center text-center md:items-center">
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-brand-gold/25 blur-lg opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-card transition group-hover:scale-105 group-hover:bg-brand-gold">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-white shadow-md">
                    {step.step.slice(1)}
                  </span>
                </div>

                {/* Text */}
                <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
