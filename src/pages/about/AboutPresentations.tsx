import React from 'react'
import { m } from 'framer-motion'
import { Eye, FileText, Calendar, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { PresentationEntry } from './aboutData'

interface AboutPresentationsProps {
  presentations: PresentationEntry[]
}

export default function AboutPresentations({
  presentations,
}: AboutPresentationsProps) {
  return (
    <m.section
      className="mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.6, duration: 0.8, ease: 'easeOut' }}
    >
      <m.h2
        className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.7, duration: 0.6 }}
      >
        Technical Talks
      </m.h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {presentations.map((presentation, index) => (
          <m.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.8 + index * 0.2,
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <Card className="border-border/50 hover:shadow-lg transition-all duration-300 h-full group hover:border-border dark:card-enhanced dark:hover-enhanced">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    {/* Conference and Category Badges */}
                    <div className="flex items-center gap-3 mb-3">
                      <Badge
                        variant="secondary"
                        className="text-xs dark:enhanced-glow"
                      >
                        {presentation.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs dark:enhanced-glow"
                      >
                        {presentation.conference}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-muted-foreground transition-colors leading-tight">
                      {presentation.title}
                    </CardTitle>
                  </div>
                  {/* PDF Icon */}
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors p-2">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>

                {/* Conference Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{presentation.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{presentation.location}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-base leading-relaxed mb-4 text-foreground">
                  {presentation.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {presentation.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs font-normal dark:enhanced-glow"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Download Button */}
                <div className="flex justify-end">
                  <a
                    href={presentation.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black dark:bg-soft-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-soft-white-hover rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 hover:scale-105 dark:enhanced-glow dark:hover-enhanced"
                  >
                    <Eye className="h-4 w-4" />
                    View Presentation
                  </a>
                </div>
              </CardContent>
            </Card>
          </m.div>
        ))}
      </div>
    </m.section>
  )
}
