'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/project-data';
import { Button } from '@/components/ui/button';

/* ─────────────────────────────────────────────
   Brand SVG Icons (same style as floating)
─────────────────────────────────────────────── */

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Social config with brand colors
─────────────────────────────────────────────── */

const socialConfig: Record<string, {
  icon: React.ReactNode;
  color: string;
}> = {
  facebook: {
    icon: <FacebookIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-br from-[#4fa3ff] to-[#0a52c4]',
  },
  instagram: {
    icon: <InstagramIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-br from-[#ffd152] via-[#ff5c5c] to-[#b833ab]',
  },
  linkedin: {
    icon: <LinkedInIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-br from-[#5cb5ff] to-[#0a66c2]',
  },
  youtube: {
    icon: <YouTubeIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-br from-[#ff6b6b] to-[#c4302b]',
  },
  whatsapp: {
    icon: <WhatsAppIcon className="h-5 w-5" />,
    color: 'bg-gradient-to-br from-[#42ff7a] to-[#128C7E]',
  },
};

/* ─────────────────────────────────────────────
   Static Links
─────────────────────────────────────────────── */

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About Us', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

const projectTypes = [
  { name: 'Plots', href: '/projects?type=plots' },
  { name: 'Villas', href: '/projects?type=villas' },
  { name: 'Apartments', href: '/projects?type=apartments' },
  { name: 'Commercial', href: '/projects?type=commercial' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
  { name: 'Disclaimer', href: '/disclaimer' },
];

/* ─────────────────────────────────────────────
   Footer Component
─────────────────────────────────────────────── */

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Build the full social list (includes WhatsApp from contact data)
  const whatsappNumber = companyInfo.contact.whatsapp || companyInfo.contact.phone[0];
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hi, I am interested in your properties. Please share more details.')}`;

  const footerSocials = [
    ...companyInfo.socialLinks.map((s) => ({
      name: s.platform,
      url: s.url,
      iconKey: s.icon,
    })),
    {
      name: 'WhatsApp',
      url: whatsappUrl,
      iconKey: 'whatsapp',
    },
  ];

  return (
    <footer className="relative text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-primary" />

      {/* MAIN */}
      <div className="section-shell relative py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* COMPANY */}
          <div className="space-y-6 md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-card">
                <Image
                  src="/pridewalls-logo-mark.png"
                  alt="PRIDEWALLS Logo"
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h3 className="wrap-break-word text-xl font-extrabold tracking-[0.14em] sm:text-2xl">{companyInfo.name}</h3>
                <p className="text-white/50 text-sm">{companyInfo.tagline}</p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/60">
              {companyInfo.description}
            </p>

            {/* Social - 3D Gradient Style (matching floating component) */}
            <div className="flex flex-wrap gap-3">
              {footerSocials.map((social, index) => {
                const config = socialConfig[social.iconKey];
                if (!config) return null;

                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    aria-label={`${companyInfo.name} on ${social.name}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative h-11 w-11 flex items-center justify-center text-white rounded-full ${config.color}
                                border border-white/30 shadow-[0_4px_6px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)]
                                transition-all duration-200 ease-out
                                before:absolute before:inset-x-1 before:top-1 before:h-1/3 before:rounded-full before:bg-white/40 before:blur-[2px] before:content-['']`}
                  >
                    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                      {config.icon}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* LINKS */}
          <FooterList title="Quick Links" items={quickLinks} />
          <FooterList title="Property Types" items={projectTypes} />

          {/* CONTACT */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="font-semibold text-lg mb-6">Request a Callback</h4>

            <ul className="space-y-4 text-white/60 text-sm">

              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                <span className="leading-6">{companyInfo.contact.address}</span>
              </li>

              {companyInfo.contact.phone.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  <a href={`tel:${p}`} className="hover:text-white transition">{p}</a>
                </li>
              ))}

              {companyInfo.contact.email.map((e, i) => (
                <li key={i} className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  <a href={`mailto:${e}`} className="hover:text-white transition">{e}</a>
                </li>
              ))}

              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>{companyInfo.contact.officeHours}</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-white/10">
        <div className="section-shell flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-white/50 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-brand-gold text-white shadow-card transition hover:bg-brand-gold-hover"
      >
        <ArrowUp size={18} />
      </Button>

    </footer>
  );
}

/* reusable list */
function FooterList({ title, items }: any) {
  return (
    <div className="lg:col-span-2">
      <h4 className="font-semibold text-lg mb-6">{title}</h4>
      <ul className="space-y-3 text-white/60">
        {items.map((i: any) => (
          <li key={i.name}>
            <Link href={i.href} className="hover:text-white transition relative group">
              {i.name}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-brand-gold transition group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}