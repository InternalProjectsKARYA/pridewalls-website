'use client';

import { motion } from 'framer-motion';
import { companyInfo } from '@/lib/project-data';
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
} from '@/lib/social-media-svg-icons';


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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 mb-16">
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