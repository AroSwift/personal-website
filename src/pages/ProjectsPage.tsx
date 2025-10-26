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
  // Work Projects
  const workProjects: Array<{
    title: string
    description: string
    tech: string
    category: string
    year: string
    status: string
    link?: string
  }> = [
    {
      title: 'American Science Cloud Hub & Portal',
      description:
        "Developing U.S. Department of Energy's AmSC Hub & Portal (AmSC = American Science Cloud). The Hub enables backend multi-HPC facility allocation requests for open science research, provider management, service management, and centralized canonical control of multiple facility management with federated authentication across HPC facilities under various security enclaves. The Portal provides centralized visualization of HPC utilization and self-management of multi-facility research.",
      tech: 'Ruby on Rails, Hotwire, SASS, Vue.js, TypeScript, Kubernetes',
      category: 'HPC Management',
      year: '2025-Present @ National Center for Computational Sciences',
      status: 'In-Development',
    },
    {
      title: 'myOLCF',
      description:
        'HPC self-service portal that I took over and delivered to production in 4 months, empowering scientists to access HPC services, manage projects, check allocations, and update profiles. Enables allocation requests for open science research and provides comprehensive metrics including burn-down charts across research projects. Features granular reporting on filesystem usage, GPU utilization, aggregated allocation usage across research projects, HPC systems, and users. Implemented OIDC authentication.',
      tech: 'Vue.js, TypeScript, SASS, PWA, Kubernetes, Kustomize, Docker',
      category: 'HPC Portal',
      year: '2020-Present @ National Center for Computational Sciences',
      status: 'Production',
      link: 'https://my.olcf.ornl.gov',
    },
    {
      title: 'RATS',
      description:
        "RATS (Resource Allocation and Tracking System) is a comprehensive HPC management and CRM application that maintains canonical state across 27+ HPC clusters including Frontier, the world's first exascale supercomputer. I've contributed to ~35% of the current production codebase. Provisions filesystem directories, UNIX users/groups, access controls, scheduler configuration (SLURM, LSF, MOAB, & KUBE), automated policy enforcement, and more for $700M+ in compute systems.",
      tech: 'Ruby on Rails, CoffeeScript, SQL, LDAP, Kubernetes, Docker',
      category: 'HPC Management',
      year: '2015-Present @ National Center for Computational Sciences',
      status: 'Production',
    },
    {
      title: 'Structured Bank Document Extraction Pipeline',
      description:
        'Built and productionized a natural language processing workflow for 100M+ documents in response to SEC requirements mandating digitization of Bank of America paper records. The NLP workflow processes digitized records through a pipeline that extracts entities like name components (first name, middle name, last name), routing numbers, statement numbers, record numbers, and address components with 96% F1 score, supporting $20M+ annual automation savings.',
      tech: 'Python, NLP, spaCy, Rasa, Flask, Machine Learning',
      category: 'Enterprise AI Workflow',
      year: '2019-2020 @ Bank of America',
      status: 'Production',
    },
  ]

  // Personal Projects
  const personalProjects: Array<{
    title: string
    description: string
    tech: string
    category: string
    year: string
    status: string
    link?: string
  }> = [
    {
      title: 'AI Podcast Production Pipeline',
      description:
        'Automatic podcast creation system that has produced 192 engaging podcast episodes so far (1.8k downloads, 50+ hours listened) through a fully automated pipeline including research, script writing, refinement, audio creation, to scheduled distribution through high-level configuration. Built with scalability in mind to easily scale up production as needed.',
      tech: 'Python, ElevenLabs, RSS',
      category: 'AI Automation',
      year: '2023',
      status: 'Production',
      link: 'https://podcasts.apple.com/us/podcast/understand-all/id1755823546',
    },
    {
      title: 'Automatic E-commerce Product Creation',
      description:
        'AI-driven workflow to automate the creation and distribution of products like t-shirts and mugs. The system handles design generation, product descriptions, pricing optimization, and inventory management through an AI-driven workflow. Generated 152 products (~$0.31/unit) with descriptions and printed designs, and auto-publish to Etsy for sale.',
      tech: 'Python, Langchain, Playwright',
      category: 'AI Automation',
      year: '2023',
      status: 'Production',
    },
    {
      title: 'Anthologia',
      description:
        'Created agentic system that conceptualizes, refines, and scripts intricate narrative ideas, transforming them into videos to create an anthology. Features automated review and critique of video sequences, narration, and sound effects. Due to cost constraints, videos are kept below 5 minutes.',
      tech: 'Python, Crew AI, Langchain, ElevenLabs',
      category: 'AI Automation',
      year: '2024-Present',
      status: 'Development',
    },
    {
      title: 'Project Cadenza',
      description:
        'AI-driven workflow creates artists, albums, writes lyrics, generates songs, masters audio, produces art, and auto-uploads to YouTube. Has published 149 music videos with high-level configuration for genre selection, artist persona development, and automated content scheduling.',
      tech: 'Python, Langchain, Puppeteer',
      category: 'AI Automation',
      year: '2023-Present',
      status: 'Production',
      link: 'https://www.youtube.com/@ProjectCadenza',
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
    {
      title: 'Automated e-book creation',
      description:
        'AI system that automatically generates story ideas, iterates and improves them, then creates structured output for chapters to produce complete e-books.',
      tech: 'Python, Crew AI',
      category: 'AI Automation',
      year: '2024',
      status: 'Development',
    },
  ]

  // Achievements
  const achievements = [
    {
      title: 'Cost Savings',
      description:
        'Built NLP entity extraction service achieving 96% F1 score at Bank of America',
      impact: '$20M+ annual savings through automation',
    },
    {
      title: 'Exascale Computing',
      description:
        'Enabled privacy-preserving federated learning at exascale on Frontier supercomputer',
      impact: "World's first exascale system deployment",
    },
    {
      title: 'Performance Optimization',
      description:
        "Achieved 1320x performance improvement for U.S. largest lab's self-service portal, myOLCF",
      impact: 'Serving 4k+ users across 1,000+ projects',
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
              A collection of professional work and personal projects spanning
              HPC systems management, software development, and agentic AI
              systems. These showcase both my professional contributions and
              personal exploration of cutting-edge technologies.
            </motion.p>
          </motion.div>

          {/* Work Projects Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Work Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workProjects.map((project, index) => (
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
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 flex items-center gap-1 text-sm"
                          >
                            <span>Visit</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base leading-relaxed mb-4 text-foreground">
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

          {/* Personal Projects Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              Personal Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personalProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.4 + index * 0.1, // Staggered animation delay
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
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 flex items-center gap-1 text-sm"
                          >
                            <span>Visit</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base leading-relaxed mb-4 text-foreground">
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
            transition={{ delay: 2.2, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.6 }}
            >
              Achievement Highlights
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 2.5 + index * 0.2, // Staggered animation
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <Card className="border-border/50 hover:shadow-lg transition-all duration-300 h-full group hover:border-border dark:card-enhanced dark:hover-enhanced">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-base text-foreground mb-3 leading-relaxed">
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
            transition={{ duration: 0.8, delay: 3.0, ease: 'easeOut' }}
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
            animationDelay={3.2}
            textColor="text-muted-foreground"
            borderColor="border-border/50"
          />
        </div>
      </main>
    </div>
  )
}

export default ProjectsPage
