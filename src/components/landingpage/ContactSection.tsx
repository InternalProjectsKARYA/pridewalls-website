'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import ContactForm from '@/components/common/ContactForm';
import { companyInfo } from '@/lib/project-data'

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
};

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Request a Callback
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Talk to a Property Advisor
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Office Address</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {companyInfo.contact.address}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone Numbers</div>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      {companyInfo.contact.phone.map((phone, index) => (
                        <div key={index}>
                          <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email Address</div>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      {companyInfo.contact.email.map((email, index) => (
                        <div key={index}>
                          <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                            {email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Office Hours</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {companyInfo.contact.officeHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="font-medium text-foreground mb-4">Follow Us</div>
                <div className="flex gap-3">
                  {companyInfo.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.platform}
                    >
                      {socialIcons[social.icon]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
              <ContactForm showProjectSelect={true} />
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 rounded-2xl overflow-hidden border border-border h-100"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2210.243449325277!2d78.38660404078047!3d17.452761776796525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb916ac614f7bd%3A0x347db45ecf3a2c2c!2sPRIDEWALLS%20INFRATECH!5e1!3m2!1sen!2sin!4v1787295641753!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map showing PRIDEWALLS office location in Madhapur, Hyderabad"
          />
          <a
            href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2210.243449325277!2d78.38660404078047!3d17.452761776796525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb916ac614f7bd%3A0x347db45ecf3a2c2c!2sPRIDEWALLS%20INFRATECH!5e1!3m2!1sen!2sin!4v1787295641753!5m2!1sen!2sin"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-primary-dark"
          >
            Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  );
}
