import React from 'react'
import { m } from 'framer-motion'
import { ExternalLink, Mail, Github } from 'lucide-react'

export default function AboutHero() {
  return (
    <m.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Left Column - Profile Image and Contact Info */}
      <div className="lg:col-span-7">
        {/* Profile Image with Hover Effects */}
        <m.div
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-64 xl:h-64 rounded-2xl sm:rounded-3xl md:rounded-[2rem] overflow-hidden mb-4 sm:mb-6 md:mb-8 border-2 sm:border-4 border-border/50 dark:border-border/30 bg-muted shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/profile-aaron-800.webp"
            alt="Aaron Barlow"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-out"
            srcSet="/profile-aaron-400.webp 400w, /profile-aaron-800.webp 800w"
            sizes="(max-width: 640px) 400px, 800px"
            loading="lazy"
          />
        </m.div>

        {/* Personal Information and Contact Details */}
        <m.div
          className="mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <m.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight tracking-tight max-w-4xl mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Aaron Barlow
          </m.h1>
          <m.p
            className="text-lg sm:text-xl text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            He/Him
          </m.p>
          <m.p
            className="text-xl sm:text-2xl font-medium mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            HPC Software Engineer @ Oak Ridge National Laboratory
          </m.p>

          {/* Contact Information Links */}
          <m.div
            className="flex flex-wrap gap-4 text-base text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              <a
                href="https://aroswift.github.io/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors no-underline"
              >
                My Resume
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <a
                href="mailto:abarlow505@gmail.com"
                className="hover:text-foreground transition-colors no-underline"
              >
                abarlow505@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <a
                href="https://github.com/aroswift"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors no-underline"
              >
                github.com/aroswift
              </a>
            </div>
          </m.div>
        </m.div>
      </div>

      {/* Right Column - Bio and Personal Statement */}
      <div className="lg:col-span-5 flex items-start lg:pt-0">
        <m.div
          className="pt-0 w-full"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <m.p
            className="text-base sm:text-lg leading-relaxed mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Full-stack software engineer enabling the world's fastest
            open-science supercomputers to operate at exascale. In my spare
            time, I build fully autonomous agentic workflows. In short: I build
            code that thinks and infrastructure that lasts.
          </m.p>

          <m.p
            className="text-base sm:text-lg leading-relaxed mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            I am an experienced full-stack software engineer with over 9 years
            of experience delivering performant and well-tested software. I love
            to solve problems, learn everything, mentor, and take on high-impact
            projects!
          </m.p>

          <m.p
            className="text-base sm:text-lg leading-relaxed mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            I'm especially passionate about designing fully autonomous,
            AI-driven workflows that seamlessly integrate advanced machine
            learning models, data pipelines, and automation systems. I love
            creating self-sustaining systems that enable AI to make decisions
            and take actions autonomously.
          </m.p>

          <m.p
            className="text-base sm:text-lg leading-relaxed mb-8 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            For me, software engineering is about solving problems that make a
            real difference in the world. Whether it's building AI-driven
            workflows or enabling open science on the world's fastest
            supercomputer, I love tackling challenging problems!
          </m.p>
        </m.div>
      </div>
    </m.div>
  )
}
