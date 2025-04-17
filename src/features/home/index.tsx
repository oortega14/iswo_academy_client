import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
import { Main } from '@/components/layout/main'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { HomeHeader } from './components/HomeHeader'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import PricingSection from './components/PricingSection'
import CtaSection from './components/CtaSection'
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({
    container: containerRef,
  })

  const heroRef = useRef<HTMLElement>(null!)
  const featuresRef = useRef<HTMLElement>(null!)
  const howItWorksRef = useRef<HTMLElement>(null!)
  const pricingRef = useRef<HTMLElement>(null!)
  const ctaRef = useRef<HTMLElement>(null!)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 10)
    })
  }, [scrollY])

  return (
    <div className='flex h-svh flex-col'>
      <HomeHeader scrolled={scrolled} />

      {/* ===== Content ===== */}
      <Main ref={containerRef} className='flex-1 overflow-auto pt-16'>
        <div className='flex flex-col space-y-12 md:space-y-16'>
          {/* Hero Section */}
          <Hero heroRef={heroRef} />

          {/* Features Section */}
          <FeaturesSection featuresRef={featuresRef} />
          

          {/* How It Works Section */}
          <HowItWorksSection howItWorksRef={howItWorksRef} />

          {/* Pricing Section */}
          <PricingSection pricingRef={pricingRef} />

          {/* CTA Section */}
          <CtaSection ctaRef={ctaRef} />
        </div>
        <Footer />
      </Main>
    </div>
  )
}
