'use client';

import { useState } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { companyInfo } from '@/lib/project-data';
import SiteVisitDialog from '@/components/landingpage/SiteVisitDialog';

export default function StickyMobileCTA() {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);

  const primaryPhone = companyInfo.contact.phone[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s+/g, '')}`;
  const whatsappHref = `https://wa.me/${(
    companyInfo.contact.whatsapp || primaryPhone
  ).replace(/\D/g, '')}`;

  return (
    <>
      {/* Sticky bottom bar - mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 shadow-[0_-8px_20px_rgba(13,38,89,0.08)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-3 gap-1 px-2 py-2">
          {/* Call */}
          <a
            href={phoneHref}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary py-2 text-white transition hover:bg-brand-primary-dark"
          >
            <Phone className="h-4 w-4" />
            <span className="text-[10px] font-semibold">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-success py-2 text-white transition hover:bg-success/90"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-[10px] font-semibold">WhatsApp</span>
          </a>

          {/* Site Visit */}
          <button
            type="button"
            onClick={() => setIsSiteVisitOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-brand-gold py-2 text-white transition hover:bg-brand-gold-hover"
          >
            <Calendar className="h-4 w-4" />
            <span className="text-[10px] font-semibold">Site Visit</span>
          </button>
        </div>
      </div>

      <SiteVisitDialog
        open={isSiteVisitOpen}
        onOpenChange={setIsSiteVisitOpen}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
        sourceLabel="Sticky mobile CTA site visit request."
      />
    </>
  );
}