import React, { Suspense } from 'react'
import Navbar from '../components/landingpage/navbar'
import HeroSection from '@/components/landingpage/HeroSection'
import TrustStrip from '@/components/landingpage/TrustStrip'
import WhyInvestSection from '@/components/landingpage/WhyInvestSection'
import FeaturedProjects from '@/components/landingpage/FeaturedProjects'
import PropertyTypesSection from '@/components/landingpage/PropertyTypesSection'
import StatsSection from '@/components/landingpage/StatsSection'
import AmenitiesPreviewSection from '@/components/landingpage/AmenitiesPreviewSection'
import AboutSection from '@/components/landingpage/AboutSection'
import CTASection from '@/components/landingpage/CTASection'
import GetInTouch from '@/components/landingpage/GetInTouch'
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Footer from '@/components/landingpage/Footer'

const page = () => {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhyInvestSection />
      <Suspense fallback={null}>
        <FeaturedProjects />
      </Suspense>
      <PropertyTypesSection/>
      <StatsSection/>
      <AmenitiesPreviewSection/>
      <AboutSection/>
      <CTASection />
      <GetInTouch/>
      
    </>
  )
}

export default page
