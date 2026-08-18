'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { companyInfo } from '@/lib/project-data';
import { Button } from '@/components/ui/button';

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

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative text-white overflow-hidden">

      {/* ⭐ Background */}
      <div className="absolute inset-0 bg-primary" />
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[420px] h-[420px] bg-brand-gold/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 w-[420px] h-[420px] bg-brand-gold/15 blur-[140px]" />
      </div> */}

      {/* ⭐ MAIN */}
      <div className="section-shell relative py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* ⭐ COMPANY */}
          <div className="space-y-6 md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-card">
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
                <h3 className="break-words text-xl font-extrabold tracking-[0.14em] sm:text-2xl">{companyInfo.name}</h3>
                <p className="text-white/50 text-sm">{companyInfo.tagline}</p>
              </div>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/60">
              {companyInfo.description}
            </p>

            {/* ⭐ Social */}
            <div className="flex gap-3">
              {companyInfo.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${companyInfo.name} on ${social.platform}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-brand-gold hover:text-white"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>

          {/* ⭐ LINKS */}
          <FooterList title="Quick Links" items={quickLinks} />
          <FooterList title="Property Types" items={projectTypes} />

          {/* ⭐ CONTACT */}
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

      {/* ⭐ Bottom */}
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

      {/* ⭐ Scroll button */}
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

/* ⭐ reusable list */
function FooterList({ title, items }: any) {
  return (
    <div className="lg:col-span-2">
      <h4 className="font-semibold text-lg mb-6">{title}</h4>
      <ul className="space-y-3 text-white/60">
        {items.map((i: any) => (
          <li key={i.name}>
            <Link href={i.href} className="hover:text-white transition relative group">
              {i.name}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-brand-gold transition group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
