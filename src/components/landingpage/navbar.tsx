'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { companyInfo } from '@/lib/project-data';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Projects',
    href: '/#projects',
    children: [
      { name: 'Ongoing Projects', href: '/#projects' },
      { name: 'Upcoming Projects', href: '/#projects' },
      { name: 'Completed Projects', href: '/#projects' },
    ],
  },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden lg:block bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
        <div className="container mx-auto px-4 flex justify-between py-2 text-sm">
          <div className="flex gap-6">
            <a href={`tel:${companyInfo.contact.phone[0]}`} className="flex gap-2 items-center">
              <Phone size={14} /> {companyInfo.contact.phone[0]}
            </a>
            <a href={`mailto:${companyInfo.contact.email[0]}`} className="flex gap-2 items-center">
              <Mail size={14} /> {companyInfo.contact.email[0]}
            </a>
          </div>
          <span>{companyInfo.contact.officeHours}</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <header
        className={`sticky top-0 z-50 transition-all ${
          isScrolled ? 'bg-white/80 backdrop-blur shadow-lg' : 'bg-white'
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center h-16 lg:h-20">

          {/* LOGO */}
          <Link href="/" className="flex gap-3 items-center">
            <Image src="/pridewalls-logo.png" alt="logo" width={44} height={44} priority />
            <div>
              <div className="font-bold">{companyInfo.name}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex gap-10">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <Link href={item.href} className="flex items-center gap-1 text-sm font-medium">
                    {item.name}
                    <ChevronDown size={14} />
                  </Link>

                  <div className="absolute left-0 top-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                    <div className="bg-white shadow-xl border min-w-[180px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-3 text-sm hover:bg-[#c42630]/10 hover:text-[#c42630]"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.name} href={item.href} className="text-sm font-medium">
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button asChild className="bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
              <Link href="/#contact">Enquire Now</Link>
            </Button>
          </div>

          {/* MOBILE */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-6">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>

        </nav>
      </header>
    </>
  );
}