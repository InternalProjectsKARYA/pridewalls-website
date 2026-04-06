import React, { Suspense } from 'react'
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
