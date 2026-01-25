import React from 'react'
import { m } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AboutOrganizationsProps {
  organizations: string[]
}

export default function AboutOrganizations({
  organizations,
}: AboutOrganizationsProps) {
  return (
    <m.section
      className="mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.0, duration: 0.8, ease: 'easeOut' }}
    >
      <h2 className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced">
        Organizations & Community
      </h2>
      <div className="max-w-4xl mx-auto">
        <Card className="border-border/50 hover:shadow-lg transition-all duration-300 group hover:border-border dark:card-enhanced dark:hover-enhanced">
          <CardHeader>
            <CardTitle className="text-xl">Leadership Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {organizations.map((org, index) => (
                <li
                  key={index}
                  className="text-base leading-relaxed flex items-start"
                >
                  <span className="text-muted-foreground mr-2 mt-1.5">•</span>
                  <span>{org}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </m.section>
  )
}
