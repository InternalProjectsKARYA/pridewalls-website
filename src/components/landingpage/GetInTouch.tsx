"use client";

import { Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id= 'contact'className="w-full py-20 bg-gradient-to-b from-[#fff5f6] to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* ⭐ Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">
            Get In Touch With <span className="text-[#c42630]">Us</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#c42630] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ================= LEFT ================= */}
          <div className="space-y-8">

            {/* ⭐ Office card */}
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur border shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-[#c42630]">HYDERABAD OFFICE</h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Plot No: 19/B, 4th Floor, Progressive Towers,<br />
                Jaihind Enclave, 100 Feet Road, Ayyappa Society, , <br />
                Madhapur, Hyderabad- 500081.
              </p>

              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>Phone: +91 91771 80333</p>
                <p className="pt-1">info@pridewalls.com</p>
              </div>
            </div>

            {/* ⭐ Form card */}
            <form className="p-6 rounded-2xl bg-white border shadow-lg space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input placeholder="Enter email address" type="email" />
              </div>

              <Input placeholder="Phone number" type="tel" />
              <Textarea placeholder="Message" />

              <button
                type="submit"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c42630] to-[#a61f28] text-white font-semibold hover:scale-[1.02] transition shadow-[0_10px_25px_rgba(196,38,48,0.35)]"
              >
                <Send size={18} />
                GET IN TOUCH
              </button>

            </form>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative h-[623px] rounded-2xl overflow-hidden shadow-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2193.1565800134977!2d78.38806349526911!3d17.45274661195516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91005f5ce709%3A0xc1f2e0646b78f7ed!2sKaryahub%20Solutions!5e1!3m2!1sen!2sin!4v1772012440540!5m2!1sen!2sin%22"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ⭐ reusable inputs */

function Input({ placeholder, type = "text" }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="h-12 w-full px-4 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#c42630]/40"
    />
  );
}

function Textarea({ placeholder }: any) {
  return (
    <textarea
      rows={4}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#c42630]/40"
    />
  );
}