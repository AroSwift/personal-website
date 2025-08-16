import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Copy, ExternalLink, Check } from 'lucide-react'
import Header from '@/components/layout/Header'

// ContactPage Component - Contact page with email copying functionality, social links, and contact information. Features animated sections and interactive email copy button with visual feedback
const ContactPage = () => {
  // Track email copy state for visual feedback
  const [emailCopied, setEmailCopied] = useState(false)

  // Copy email to clipboard and show success feedback - resets feedback after 2 seconds
  const copyEmail = () => {
    navigator.clipboard.writeText('abarlow505@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  // Social media links with icons and URLs
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/AroSwift',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/allaaronbarlow/',
    },
  ]

  return (
    <div className="min-h-screen text-black dark:text-white bg-neutral-200 dark:bg-neutral-900 relative overflow-hidden transition-colors duration-800">
      {/* Multi-layered animated hue overlays for sophisticated effect */}
      <div className="animated-hue-overlay" />
      <div className="animated-hue-overlay-slow" />
      <div className="animated-hue-overlay-fast" />
      {/* Neutral background - no gradients */}

      <Header />

      {/* Large Dynamic Title - Mobile-first responsive sizing */}
      <div className="absolute top-[20%] sm:top-[15%] md:top-[20%] lg:top-[25%] left-0 right-0 pointer-events-none z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-[16vw] sm:text-[14vw] md:text-[16vw] lg:text-[15.1vw] xl:text-[13vw] 2xl:text-[10.8vw] font-light leading-none tracking-wide text-black dark:text-white transition-colors duration-800">
            Get in touch
          </h1>
        </div>
      </div>

      {/* Main Content - Mobile-first padding to prevent overlap */}
      <main className="pt-[25rem] sm:pt-[32rem] md:pt-[28rem] lg:pt-[28rem] xl:pt-[32rem] 2xl:pt-[36rem] min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col flex-1 justify-end pb-8 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32">
          <div className="relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 mb-16 lg:mb-20"
            >
              {/* Left Column - Contact Description and Action Buttons */}
              <div className="space-y-8 lg:space-y-10">
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-black dark:text-white leading-relaxed max-w-xl transition-colors duration-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  I enjoy connecting with new people. The easiest way to reach
                  me is via{' '}
                  <button
                    onClick={() =>
                      window.open('mailto:abarlow505@gmail.com', '_blank')
                    }
                    className="underline-fade-out hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                  >
                    email
                  </button>{' '}
                  but alternatively feel free to send me a message through{' '}
                  <button
                    onClick={() =>
                      window.open(
                        'https://linkedin.com/in/allaaronbarlow/',
                        '_blank'
                      )
                    }
                    className="underline-fade-out hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer bg-transparent border-none p-0 font-inherit text-inherit"
                  >
                    LinkedIn
                  </button>
                  .
                </motion.p>

                {/* Action Buttons - Resume, Email Copy, and LinkedIn */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {/* Resume Button */}
                  <Button
                    onClick={() =>
                      window.open(
                        'https://github.com/AroSwift/resume/blob/main/resume.pdf',
                        '_blank'
                      )
                    }
                    className="bg-black dark:bg-soft-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-soft-white-hover rounded-full px-5 sm:px-6 py-3 sm:py-5 text-base sm:text-lg md:text-xl font-medium flex items-center gap-3 transition-colors duration-500"
                  >
                    My Resume
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>

                  {/* Email Copy Button with Success Animation */}
                  <motion.div
                    animate={
                      emailCopied ? { scale: [1, 1.05, 1] } : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      onClick={copyEmail}
                      variant="outline"
                      className={`w-full sm:w-auto border-2 ${emailCopied ? 'border-green-600/40 dark:border-green-400/60 text-green-800 dark:text-green-200 bg-green-50/80 dark:bg-green-900/40' : 'border-black dark:border-soft-white text-black dark:text-soft-white hover:bg-black dark:hover:bg-soft-white hover:text-white dark:hover:text-black'} rounded-full px-5 sm:px-6 py-3 sm:py-5 text-base sm:text-lg md:text-xl font-medium flex items-center gap-3 transition-all duration-500`}
                    >
                      <motion.div
                        animate={emailCopied ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {emailCopied ? (
                          <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </motion.div>
                      {emailCopied ? 'Copied!' : 'Copy email'}
                    </Button>
                  </motion.div>

                  {/* LinkedIn Reach Out Button */}
                  <Button
                    variant="outline"
                    className="border-2 border-black dark:border-soft-white text-black dark:text-soft-white hover:bg-black dark:hover:bg-soft-white hover:text-white dark:hover:text-black rounded-full px-5 sm:px-6 py-3 sm:py-5 text-base sm:text-lg md:text-xl font-medium flex items-center gap-3 transition-colors duration-500"
                    onClick={() =>
                      window.open(
                        'https://linkedin.com/in/allaaronbarlow/',
                        '_blank'
                      )
                    }
                  >
                    Reach out
                  </Button>
                </motion.div>
              </div>

              {/* Right Column - Social Media Links */}
              <div className="space-y-8 lg:space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-medium mb-3 text-black dark:text-white transition-colors duration-800">
                    On social platforms
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-800">
                    Let's connect and get in touch 👋
                  </p>

                  {/* Social Links with Hover Effects */}
                  <div className="flex gap-6">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300/50 dark:hover:bg-gray-700/50 transition-colors group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            duration: 0.4,
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                          <span className="text-lg font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                            {social.name}
                          </span>
                        </motion.a>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Footer Information Section */}
            <motion.div
              className="pt-10 sm:pt-16 border-t border-gray-300/50 dark:border-gray-600/50 transition-colors duration-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 text-lg text-gray-600 dark:text-gray-400 transition-colors duration-800">
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
                    Location
                  </h4>
                  <p>Charlotte, NC (EST)</p>
                  <p>Open to remote</p>
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
                    Currently
                  </h4>
                  <p>HPC Software Engineer @ ORNL</p>
                  <p>Building agentic AI workflows</p>
                </div>
                <div>
                  <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
                    Principles
                  </h4>
                  <p>Ship fast, then make it faster</p>
                  <p>Automate the boring stuff</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPage
