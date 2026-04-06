import type { Metadata } from "next";
import "./globals.css";
import Navbar from '../components/landingpage/navbar'
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Footer from '@/components/landingpage/Footer'

export const metadata: Metadata = {
  title: {
    default: "Pridewalls | Premium Real Estate in Hyderabad",
    template: "%s | Pridewalls",
  },
  description:
    "Discover premium plots, apartments, and villa communities by Pridewalls in Hyderabad, crafted around approvals, strong locations, and refined living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Navbar />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
