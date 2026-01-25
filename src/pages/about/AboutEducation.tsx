import React from 'react'
import { m } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EducationEntry } from './aboutData'

interface AboutEducationProps {
  education: EducationEntry[]
}

export default function AboutEducation({ education }: AboutEducationProps) {
  return (
    <m.section
      className="mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.2, duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced">
        Education
      </h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <Card
            key={index}
            className="border-border/50 hover:shadow-lg transition-all duration-300 group hover:border-border dark:card-enhanced dark:hover-enhanced overflow-hidden"
          >
            {/* Banner Image */}
            {edu.bannerImage && (
              <div className="w-full h-24 max-h-24 overflow-hidden">
                <img
                  src={edu.bannerImage}
                  alt={`${edu.school} campus`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <p className="text-lg font-medium text-muted-foreground">
                    {edu.school}
                  </p>
                </div>
                <div className="text-base text-muted-foreground text-right">
                  <p>{edu.period}</p>
                  <p>GPA: {edu.gpa}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-base">
                <p>
                  <strong>Honors:</strong> {edu.honors}
                </p>
                <p>
                  <strong>Activities:</strong> {edu.activities}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </m.section>
  )
}
