"use client";

import Link from "next/link";
import { Cookie, FileText, Scale, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export const legalLinks = [
  { name: "Privacy Policy", shortName: "Privacy", href: "/privacy-policy", icon: ShieldCheck },
  { name: "Terms of Service", shortName: "Terms", href: "/terms-of-service", icon: FileText },
  { name: "Cookie Policy", shortName: "Cookies", href: "/cookie-policy", icon: Cookie },
  { name: "Disclaimer", shortName: "Disclaimer", href: "/disclaimer", icon: Scale },
];

export default function LegalNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Legal policies" className="lg:sticky lg:top-28 lg:self-start">
      <div className="lg:rounded-2xl lg:border lg:border-primary/10 lg:bg-white lg:p-3 lg:shadow-[0_12px_30px_rgba(13,38,89,0.06)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:block lg:space-y-1.5">
          <p className="hidden px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground lg:block">
            Legal centre
          </p>
          {legalLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-all sm:px-2.5 lg:flex lg:w-full lg:justify-start lg:px-3.5 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_6px_16px_rgba(13,38,89,0.2)]"
                    : "border border-border bg-white text-primary hover:border-primary/20 hover:bg-brand-primary-light/50 lg:border-transparent lg:bg-transparent"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate lg:hidden">{link.shortName}</span>
                <span className="hidden lg:inline">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
