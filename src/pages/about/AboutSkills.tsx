import React from 'react'
import { m } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface AboutSkillsProps {
  skills: string[]
}

export default function AboutSkills({ skills }: AboutSkillsProps) {
  return (
    <m.section
      className="mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 0.8, ease: 'easeOut' }}
    >
      <m.h2
        className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
      >
        Skills & Technologies
      </m.h2>
      <m.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.7, duration: 0.8, ease: 'easeOut' }}
      >
        {skills.map((skill, index) => (
          <m.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 + index * 0.02, duration: 0.4 }}
          >
            <Badge
              variant="secondary"
              className="px-3 py-1 text-base hover:scale-105 transition-transform duration-200 dark:enhanced-glow"
            >
              {skill}
            </Badge>
          </m.div>
        ))}
      </m.div>
    </m.section>
  )
}
