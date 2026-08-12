import React, { Suspense } from 'react'
import HeroSection from '@/components/landingpage/HeroSection'
import TrustStrip from '@/components/landingpage/TrustStrip'
import WhyInvestSection from '@/components/landingpage/WhyInvestSection'
import HowItWorks from '@/components/landingpage/HowItWorks'
import FeaturedProjects from '@/components/landingpage/FeaturedProjects'
import StatsSection from '@/components/landingpage/StatsSection'
import AmenitiesPreviewSection from '@/components/landingpage/AmenitiesPreviewSection'
import AboutSection from '@/components/landingpage/AboutSection'
import CTASection from '@/components/landingpage/CTASection'
import GetInTouch from '@/components/landingpage/GetInTouch'
import WhyHyderabad from '@/components/landingpage/WhyHyderabad'
import PropertyCategories from '@/components/landingpage/PropertyCategories'

const page = () => {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhyInvestSection />
      <Suspense fallback={null}>
        <FeaturedProjects />
      </Suspense>
      <PropertyCategories />
      <HowItWorks />
      <StatsSection/>
      <AmenitiesPreviewSection/>
      <WhyHyderabad />
      <AboutSection/>
      <CTASection />
      <GetInTouch/>
      
    </>
  )
}

export default page
