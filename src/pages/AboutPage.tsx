import React from 'react'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import {
  skills,
  experience,
  education,
  organizations,
  presentations,
} from './about/aboutData'
import AboutHero from './about/AboutHero'
import AboutExperience from './about/AboutExperience'
import AboutSkills from './about/AboutSkills'
import AboutEducation from './about/AboutEducation'
import AboutPresentations from './about/AboutPresentations'
import AboutOrganizations from './about/AboutOrganizations'

const AboutPage = () => {
  return (
    <div className="min-h-screen text-foreground bg-background relative overflow-hidden">
      {/* Multi-layered animated hue overlays for sophisticated effect */}
      <div className="animated-hue-overlay" />
      <div className="animated-hue-overlay-slow" />
      <div className="animated-hue-overlay-fast" />
      {/* Subtle warm gradient with cool accent - matching homepage */}
      <div className="absolute inset-0 bg-gradient-to-tl from-orange-100/40 via-amber-50/20 to-transparent pointer-events-none dark:from-orange-900/10 dark:via-amber-900/5 dark:to-transparent transition-all duration-800 ease-in-out" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/25 pointer-events-none dark:to-blue-900/10 transition-all duration-800 ease-in-out" />

      <Header />

      {/* Main Content */}
      <main className="pt-36 sm:pt-42 md:pt-48 lg:pt-54 xl:pt-60 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col flex-1 justify-start pb-16 sm:pb-24 lg:pb-32 relative z-20">
          <AboutHero />

          <AboutExperience experience={experience} />

          <AboutSkills skills={skills} />

          <AboutEducation education={education} />

          <AboutPresentations presentations={presentations} />

          <AboutOrganizations organizations={organizations} />

          {/* Call-to-Action Buttons */}
          <m.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 3.8, ease: 'easeOut' }}
          >
            <Link to="/projects" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-black dark:bg-soft-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-soft-white-hover rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-medium transition-colors duration-500 dark:enhanced-glow dark:hover-enhanced">
                View Projects
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-black dark:border-soft-white text-black dark:text-soft-white hover:bg-black dark:hover:bg-soft-white hover:text-white dark:hover:text-black rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-medium transition-colors duration-500"
              >
                Get in touch
              </Button>
            </Link>
          </m.div>

          {/* Footer Information Section */}
          <Footer
            animationDelay={4.0}
            textColor="text-muted-foreground"
            borderColor="border-border/50"
          />
        </div>
      </main>
    </div>
  )
}

export default AboutPage
