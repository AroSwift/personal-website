import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Projects page
const ProjectsPage = () => {
  // Projects
  const featuredProjects = [
    {
      title: 'Automatic Movie Creation',
      description:
        'Multi-agent workflow generates script → storyboard images → 10-sec clips → stitches, QC, and auto-publishes.',
      tech: 'Agentic Pipeline, Runway, Cling',
      category: 'AI Automation',
      year: '2024',
      status: 'Active',
    },
    {
      title: 'Anthologia (AI Video Storytelling)',
      description:
        'Multi-agent pipeline turns concepts into 20-second videos with 4 scenes, using DALL·E 3 + Veo 3.0, ElevenLabs narration/SFX.',
      tech: 'CrewAI, DALL·E 3, Veo 3.0, ElevenLabs, LatentSync',
      category: 'AI Automation',
      year: '2024',
      status: 'Active',
    },
    {
      title: 'Project Cadenza',
      description:
        'Agentic pipeline creates artists/albums, writes lyrics, generates songs, masters audio, produces thumbnails/art, and auto-uploads to YouTube.',
      tech: 'GPT, Suno, Udio, YouTube API',
      category: 'AI Automation',
      year: '2024',
      status: 'Active',
    },
    {
      title: 'myOLCF',
      description:
        'HPC self-service portal empowering scientists to access OLCF services, manage projects, check allocations, and update profiles.',
      tech: 'Ruby on Rails, PostgreSQL, Redis',
      category: 'HPC Platform',
      year: '2020-Present',
      status: 'Production',
      link: 'https://my.olcf.ornl.gov',
    },
    {
      title: 'AI Prediction-Market Trading System',
      description:
        'Multi-agent analysis with real-time WebSocket feeds, vector DB, and Kelly sizing for automated trading decisions.',
      tech: 'CrewAI, WebSocket, Vector DB, Kalshi API',
      category: 'AI Trading',
      year: '2024',
      status: 'Development',
    },
    {
      title: 'HOA Management Platform',
      description:
        'Multi-tenant Rails+React application with modules for dues, violations, residents, and public sites.',
      tech: 'Ruby on Rails, React, Vite, Inertia',
      category: 'Web Platform',
      year: '2023',
      status: 'Production',
    },
  ]

  // Achievements
  const achievements = [
    {
      title: 'Performance Breakthrough',
      description:
        'Achieved 1320× performance improvement (−99.92%) in myOLCF through architectural changes',
      impact: 'Serving 4k+ users across 1,000+ projects',
    },
    {
      title: 'Exascale Computing',
      description:
        'Enabled privacy-preserving federated learning at exascale on Frontier supercomputer',
      impact: "World's first exascale system deployment",
    },
    {
      title: 'Cost Savings',
      description:
        'Built NLP entity extraction service achieving 96% F1 score at Bank of America',
      impact: '$20M+ annual savings through automation',
    },
  ]

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
      <main className="pt-48 sm:pt-56 md:pt-64 lg:pt-72 xl:pt-80 min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col flex-1 justify-start pb-16 sm:pb-24 lg:pb-32 relative z-20">
          {/* Hero Section with Title and Description */}
          <motion.div
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-tight tracking-tight mb-8 dark:text-enhanced"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Selected Projects
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A collection of work spanning HPC platform engineering, agentic AI
              systems, and performance optimization at scale. Each project
              represents a unique challenge solved through innovative
              engineering.
            </motion.p>
          </motion.div>

          {/* Featured Projects Grid with Staggered Animation */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1, // Staggered animation delay
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <Card className="border-border/50 hover:shadow-lg transition-all duration-300 h-full group hover:border-border dark:card-enhanced dark:hover-enhanced">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {/* Project Category and Status Badges */}
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="secondary"
                              className="text-xs dark:enhanced-glow"
                            >
                              {project.category}
                            </Badge>
                            <Badge
                              variant={
                                project.status === 'Active'
                                  ? 'default'
                                  : project.status === 'Production'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className="text-xs dark:enhanced-glow"
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-2xl font-bold group-hover:text-muted-foreground transition-colors">
                            {project.title}
                          </CardTitle>
                          <p className="text-base text-muted-foreground mt-1">
                            {project.year}
                          </p>
                        </div>
                        {/* External Link Icon for Projects with Live URLs */}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base leading-relaxed mb-4 text-foreground/90">
                        {project.description}
                      </p>
                      {/* Technology Stack Badges */}
                      <div className="flex flex-wrap gap-1">
                        {project.tech.split(', ').map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs font-normal dark:enhanced-glow"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Key Achievements Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
            >
              Key Achievements
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.3 + index * 0.2, // Staggered animation
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <Card className="border-border/50 h-full dark:card-enhanced dark:hover-enhanced">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-base text-foreground/90 mb-3 leading-relaxed">
                        {achievement.description}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {achievement.impact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.8, ease: 'easeOut' }}
          >
            <Link to="/about" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-black dark:bg-soft-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-soft-white-hover rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-medium transition-colors duration-500 dark:enhanced-glow dark:hover-enhanced">
                About Me
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-black dark:border-soft-white text-black dark:text-soft-white hover:bg-black dark:hover:bg-soft-white hover:text-white dark:hover:text-black rounded-full px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-medium transition-colors duration-500 dark:enhanced-glow dark:hover-enhanced"
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>

          {/* Footer Information Section */}
          <Footer
            animationDelay={3.0}
            textColor="text-muted-foreground"
            borderColor="border-border/50"
          />
        </div>
      </main>
    </div>
  )
}

export default ProjectsPage
