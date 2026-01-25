import React from 'react'
import { m } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ExperienceEntry } from './aboutData'

interface AboutExperienceProps {
  experience: ExperienceEntry[]
}

export default function AboutExperience({ experience }: AboutExperienceProps) {
  return (
    <m.section
      className="mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
    >
      <m.h2
        className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        Experience
      </m.h2>
      <div className="space-y-8">
        {experience.map((job, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.8 + index * 0.2,
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 group hover:border-border dark:card-enhanced dark:hover-enhanced overflow-hidden">
              {/* Banner Image */}
              {job.bannerImage && (
                <div className="w-full h-24 max-h-24 overflow-hidden">
                  <img
                    src={job.bannerImage}
                    alt={`${job.company} office`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      {job.company}
                    </CardTitle>
                    <p className="text-xl text-muted-foreground">{job.role}</p>
                  </div>
                  <div className="text-base text-muted-foreground text-right">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                {job.scope && (
                  <p className="text-base text-muted-foreground mt-3 italic">
                    {job.scope}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-base leading-relaxed flex items-start"
                    >
                      <span className="text-muted-foreground mr-3 mt-1 flex-shrink-0">
                        ◆
                      </span>
                      <span className="flex-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </div>
    </m.section>
  )
}
