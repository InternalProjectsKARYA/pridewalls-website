'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { companyInfo } from '@/lib/project-data';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/#projects' },
  { name: 'About Us', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

const projectTypes = [
  { name: 'Plots', href: '/#projects?type=plots' },
  { name: 'Villas', href: '/#projects?type=villas' },
  { name: 'Apartments', href: '/#projects?type=apartments' },
  { name: 'Commercial', href: '/#projects?type=commercial' },
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#140708] to-[#0d0405]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 w-[420px] h-[420px] bg-[#c42630]/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-0 w-[420px] h-[420px] bg-[#c42630]/15 blur-[140px]" />
      </div>

      {/* ⭐ MAIN */}
      <div className="relative container mx-auto px-4 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ⭐ COMPANY */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c42630] to-[#a61f28] flex items-center justify-center shadow-[0_10px_25px_rgba(196,38,48,0.5)]">
                <Image
                  src="/pridewalls-logo.png"
                  alt="Pridewalls Logo"
                  width={48}
                  height={48}
                  priority
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">{companyInfo.name}</h3>
                <p className="text-white/50 text-sm">{companyInfo.tagline}</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
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
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-[#c42630] hover:scale-105 transition"
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
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>

            <ul className="space-y-4 text-white/60 text-sm">

              <li className="flex gap-3">
                <MapPin className="text-[#c42630]" size={52} />
                {companyInfo.contact.address}
              </li>

              {companyInfo.contact.phone.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <Phone className="text-[#c42630]" size={18} />
                  <a href={`tel:${p}`} className="hover:text-white transition">{p}</a>
                </li>
              ))}

              {companyInfo.contact.email.map((e, i) => (
                <li key={i} className="flex gap-3">
                  <Mail className="text-[#c42630]" size={18} />
                  <a href={`mailto:${e}`} className="hover:text-white transition">{e}</a>
                </li>
              ))}

              <li className="flex gap-3">
                <Clock className="text-[#c42630]" size={18} />
                {companyInfo.contact.officeHours}
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* ⭐ Bottom */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* ⭐ Scroll button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#c42630] to-[#a61f28] shadow-[0_10px_25px_rgba(196,38,48,0.6)] hover:scale-110 transition"
      >
        <ArrowUp size={18} />
      </Button>

    </footer>
  );
}

/* ⭐ reusable list */
function FooterList({ title, items }: any) {
  return (
    <div>
      <h4 className="font-semibold text-lg mb-6">{title}</h4>
      <ul className="space-y-3 text-white/60">
        {items.map((i: any) => (
          <li key={i.name}>
            <Link href={i.href} className="hover:text-white transition relative group">
              {i.name}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#c42630] group-hover:w-full transition" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}