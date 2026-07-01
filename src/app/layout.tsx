import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from '../components/landingpage/navbar'
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Footer from '@/components/landingpage/Footer'

export const metadata: Metadata = {
  title: "PRIDEWALLS",
  description: "Premium residential projects, site visits, and property enquiries from PRIDEWALLS.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
