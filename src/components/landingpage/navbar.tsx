'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { companyInfo } from '@/lib/project-data';
import Image from 'next/image';

/* ⭐ NAV CONFIG WITH DROPDOWN */
const navigation = [
  { name: 'Home', href: '/' },

  {
    name: 'Projects',
    href: '/#projects',
    children: [
      { name: 'Upcoming', href: '/#projects?status=upcoming' },
      { name: 'Completed', href: '/#projects?status=completed' },
    ],
  },

  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ⭐ TOP BAR */}
      <div className="hidden lg:block bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
        <div className="container mx-auto px-4 flex justify-between py-2 text-sm">
          <div className="flex gap-6">
            <a href={`tel:${companyInfo.contact.phone[0]}`} className="flex gap-2 items-center hover:opacity-80">
              <Phone size={14} /> {companyInfo.contact.phone[0]}
            </a>
            <a href={`mailto:${companyInfo.contact.email[0]}`} className="flex gap-2 items-center hover:opacity-80">
              <Mail size={14} /> {companyInfo.contact.email[0]}
            </a>
          </div>
          <span className="opacity-80">{companyInfo.contact.officeHours}</span>
        </div>
      </div>

      {/* ⭐ MAIN NAV */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
            : 'bg-white'
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center h-16 lg:h-20">

          {/* ⭐ LOGO */}
          <Link href="/" className="flex gap-3 items-center">
            <div className="relative">
              <Image src="/pridewalls-logo.png" alt="logo" width={44} height={44} priority />
              <div className="absolute inset-0 bg-[#c42630]/20 blur-lg -z-10" />
            </div>
            <div>
              <div className="font-bold text-lg">{companyInfo.name}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{companyInfo.tagline}</div>
            </div>
          </Link>

          {/* ⭐ DESKTOP LINKS */}
          <div className="hidden lg:flex gap-10">
            {navigation.map((item) => {
              const active = pathname === item.href;

              /* ⭐ DROPDOWN ITEM */
              if (item.children) {
                return (
                  <div key={item.name} className="relative group">
                    <Link href={item.href} className="relative text-sm font-medium">
                      <span className={`transition ${active ? 'text-[#c42630]' : ''}`}>
                        {item.name}
                      </span>

                      <span className="absolute left-0 -bottom-1 h-[2px] bg-[#c42630] w-0 group-hover:w-full transition-all" />
                    </Link>

                    {/* ⭐ DROPDOWN */}
                    <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                      <div className="bg-white shadow-xl border min-w-[180px] overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-3 text-sm hover:bg-[#c42630]/10 hover:text-[#c42630] transition"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              /* ⭐ NORMAL ITEM */
              return (
                <Link key={item.name} href={item.href} className="relative text-sm font-medium group">
                  <span className={`transition ${active ? 'text-[#c42630]' : ''}`}>
                    {item.name}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#c42630] transition-all ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ⭐ CTA */}
          <div className="hidden lg:flex">
            <Button
              asChild
              className="bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white shadow-[0_10px_25px_rgba(196,38,48,0.35)] hover:scale-105 transition"
            >
              <Link href="/#contact">Enquire Now</Link>
            </Button>
          </div>

          {/* ⭐ MOBILE MENU */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="p-0">
              <div className="h-full flex flex-col">

                {/* mobile header */}
                <div className="p-6 border-b bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
                  <div className="font-bold text-lg">{companyInfo.name}</div>
                </div>

                {/* mobile nav */}
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {navigation.map((item) =>
                      item.children ? (
                        <li key={item.name}>
                          <div className="font-semibold mb-2">{item.name}</div>
                          <ul className="ml-4 space-y-2">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block text-base hover:text-[#c42630]"
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-medium hover:text-[#c42630]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>

                {/* mobile footer */}
                <div className="p-6 border-t">
                  <Button asChild className="w-full bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white">
                    <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                        Enquire Now
                      </Link>
                  </Button>
                </div>

              </div>
            </SheetContent>
          </Sheet>

        </nav>
      </header>
    </>
  );
}