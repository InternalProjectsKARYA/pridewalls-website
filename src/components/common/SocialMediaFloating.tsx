'use client';

import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/project-data';

// High-quality brand SVG icons
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

export default function SocialMediaFloating() {
  // Data mapping
  const whatsappNumber = companyInfo.contact.whatsapp || companyInfo.contact.phone[0];
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hi, I am interested in your properties. Please share more details.')}`;
  
  const instagramUrl = companyInfo.socialLinks.find(s => s.platform === 'Instagram')?.url || '#';
  const facebookUrl = companyInfo.socialLinks.find(s => s.platform === 'Facebook')?.url || '#';

  // Only WhatsApp, Instagram, and Facebook
  const socials = [
    { 
      name: 'WhatsApp', 
      url: whatsappUrl, 
      icon: <WhatsAppIcon className="h-5 w-5" />, 
      // 3D gradient effect: Light top-left to Dark bottom-right
      color: 'bg-gradient-to-br from-[#42ff7a] to-[#128C7E]', 
    },
    { 
      name: 'Instagram', 
      url: instagramUrl, 
      icon: <InstagramIcon className="h-5 w-5" />, 
      color: 'bg-gradient-to-br from-[#ffd152] via-[#ff5c5c] to-[#b833ab]', 
    },
    { 
      name: 'Facebook', 
      url: facebookUrl, 
      icon: <FacebookIcon className="h-5 w-5" />, 
      color: 'bg-gradient-to-br from-[#4fa3ff] to-[#0a52c4]', 
    },
  ];

  return (
    <>
      {/* Floating Normal Stack - Right Side */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            aria-label={social.name}
            // Initial subtle pop-in animation
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            // 3D Styling: 
            // 1. Relative positioning for inner highlight
            // 2. Border for sharp edge
            // 3. Heavy offset shadow for depth
            // 4. Hover effect to lift it up
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-12 h-12 flex items-center justify-center text-white rounded-full ${social.color} 
                        border border-white/30 shadow-[0_4px_6px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.2)] 
                        transition-all duration-200 ease-out
                        before:absolute before:inset-x-1 before:top-1 before:h-1/3 before:rounded-full before:bg-white/40 before:blur-[2px] before:content-['']`}
          >
            {/* Drop shadow on the icon itself to make it look raised/3D */}
            <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
              {social.icon}
            </span>
          </motion.a>
        ))}
      </div>
    </>
  );
}