'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { companyInfo } from '@/lib/project-data';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = companyInfo.contact.whatsapp || companyInfo.contact.phone[0];
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hi, I am interested in your properties. Please share more details.')}`;

  return (
    <>
      {/* Floating Action Button - Right Side */}
      <div className="fixed bottom-5 right-6 z-50 flex flex-col items-center gap-3">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Popup Card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-20 right-0 w-72 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
              >
                {/* Header */}
                <div className="bg-success text-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">PRIDEWALLS</div>
                      <div className="text-sm text-white/80">Typically replies instantly</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Hi there! 👋 How can we help you with your property search?
                  </p>
                  
                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-success/10 hover:bg-success/10 transition-colors text-success"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Chat on WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${companyInfo.contact.phone[0]}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{companyInfo.contact.phone[0]}</span>
                    </a>
                    <a
                      href={`mailto:${companyInfo.contact.email[0]}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Send Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close contact options" : "Contact us"}
          aria-expanded={isOpen}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-foreground text-background rotate-0' 
              : 'bg-success/100 text-white'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </motion.button>

        {/* Pulse animation when closed */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-14 h-14 rounded-full bg-success/100 pointer-events-none"
          />
        )}
      </div>

      {/* Direct WhatsApp Link Button */}
      {/* <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-24 z-50 bg-success/100 hover:bg-success text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors text-sm font-medium"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Chat Now</span>
      </a> */}
    </>
  );
}
