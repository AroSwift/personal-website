import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  ExternalLink,
  Mail,
  Github,
  Download,
  FileText,
  Calendar,
  MapPin,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// About page
const AboutPage = () => {
  // Skills
  const skills = [
    'Ruby',
    'Ruby on Rails',
    'Python',
    'Go',
    'TypeScript',
    'JavaScript',
    'Vue.js',
    'React',
    'CoffeeScript',
    'Crystal',
    'Amber',
    'Ember.js',
    'PHP',
    'C',
    'C++',
    'C#',
    'Processing',
    'Assembly',
    'SQL',
    'Bash',
    'HTML',
    'CSS',
    'Sass',
    'Git',
    'gRPC',
    'REST',
    'Redis',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Kustomize',
    'Argo CD',
    'Slurm',
    'CI/CD',
    'NVFLARE',
    'PyTorch',
    'Natural Language Processing (NLP)',
    'spaCy',
    'RASA',
    'TensorFlow',
    'Keras API',
    'Pandas',
    'NumPy',
    'scikit-learn',
    'AI-driven workflow automation',
    'Embedded systems development',
  ]

  // Professional experience timeline
  const experience = [
    {
      company: 'Oak Ridge National Laboratory',
      role: 'HPC Software Engineer',
      period: 'Jun 2020 - Present',
      location: 'Oak Ridge, TN (Remote)',
      scope: '',
      highlights: [
        'Enabled privacy-preserving federated learning on Frontier (first U.S. exascale system; TOP500 #2). Ported NVFLARE to ROCm/MI250X with PyTorch, built HIP-compatible containers, integrated with Slurm (mTLS in enclaves), and validated multi-node training rounds previously impossible.',
        'Owned and scaled myOLCF self-service portal to ~4,000 users across 1,000+ projects with 99.9%+ uptime; shipped 12 FY2025 releases governing access, allocation, and policy across enclaves.',
        'Replaced Jbuilder with JSON:API serializer + Redis caching; took 100k-row endpoint 272s → 178–206ms (1,320× faster, –99.92%), cut ActiveRecord 19.2s → 8.8ms, and eliminated cluster sync timeouts.',
        'Built Crystal/Amber Smart Facility metrics platform ingesting 100k+ time-series records; served dashboards in ~87ms and benchmarked 10.4k req/sec per core. Used for procurement and to flag inefficient Slurm jobs.',
        'Accelerated CI/CD: builds 2m → 9s (-92%), startup 30s → <200ms (-99%), tests 90s → 6s (-93%). Standardized GitOps delivery with Kustomize + Argo CD on Kubernetes.',
        'Central policy-as-code service automating provisioning, access, and scheduler policy across SLURM/LSF enclaves. Zero post-deploy incidents in 3 years due to expanded Cypress coverage + validation.',
      ],
    },
    {
      company: 'Bank of America',
      role: 'Global Technology Summer Analyst (ML Engineer Intern)',
      period: 'Jun 2019 - Aug 2019',
      location: 'Greater Los Angeles Area',
      highlights: [
        'Built NLP entity extraction service (names, phones, addresses, accounts, amounts) achieving 96% F1 score, enabling $20M+ in annual automation savings.',
      ],
    },
    {
      company: 'Oak Ridge National Laboratory',
      role: 'Software Developer Intern, National Center for Computational Sciences (NCCS)',
      period: 'May 2015 - May 2019',
      location: 'Oak Ridge, TN',
      highlights: [
        'Year-round development of HPC-centric services, applications, and BI tools for 20+ HPC clusters, ensuring uptime for $250M compute systems; shipped production features across internal portals.',
        'Automated supercomputer-access communications via policy-aware email system; standardized messaging and reduced manual steps.',
        'Built WordPress/REST plugin to sync and display HPC metrics on olcf.ornl.gov; improved data freshness and reduced update toil.',
      ],
    },
  ]

  // Educational background
  const education = [
    {
      school: 'East Tennessee State University',
      degree: 'B.S. in Computer Science',
      period: 'Aug 2017 - May 2020',
      gpa: '3.94/4.00',
      honors: "Dean's List",
      activities:
        'ACM (President, 2019-2020), Ethical Hacking (Vice President, 2018-2019)',
    },
    {
      school: 'Pellissippi State Community College',
      degree: 'Associate of Science, Computer and Information Sciences',
      period: 'Aug 2015 - May 2017',
      gpa: '3.84/4',
      honors: "Dean's List",
      activities: 'Phi Theta Kappa Honor Society, Gamma Beta Phi Society',
    },
  ]

  // Leadership and community involvement
  const organizations = [
    'ORNL Pathways to Computing Internship Program Workshop - Organizer (Jan 2022 - Present)',
    'PEARC (Advanced Research Computing Conference) - Student Program Committee Chair (Jan 2021 - Present)',
    'ACM (Association for Computing Machinery) - President (Jan 2019 - May 2020)',
    'Ethical Hacking - Vice President (Jan 2018 - Dec 2019)',
  ]

  // Conference presentations and talks with PDF downloads
  const presentations = [
    {
      title:
        'Employing a Software-Driven Approach to Scalable HPC System Management',
      conference: 'CUG 2025',
      date: '2025',
      location: 'In-Person',
      description:
        'Presentation on implementing software-driven approaches for managing large-scale HPC systems, focusing on automation and scalability.',
      pdfUrl: '/presentations/cug-2025-hpc-system-management.pdf',
      category: 'HPC Management',
      tags: ['HPC', 'System Management', 'Automation', 'Scalability'],
    },
    {
      title: 'Employing DevOps in HPC Operational Management',
      conference: 'NLIT 2024',
      date: '2024',
      location: 'In-Person',
      description:
        'Presentation on applying DevOps principles and practices to High Performance Computing operational workflows and infrastructure management.',
      pdfUrl: '/presentations/nlit-2024-devops-hpc.pdf',
      category: 'DevOps',
      tags: ['DevOps', 'HPC', 'Operations', 'Infrastructure'],
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
          {/* Hero Section with Profile and Bio */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Left Column - Profile Image and Contact Info */}
            <div className="lg:col-span-7">
              {/* Profile Image with Hover Effects */}
              <motion.div
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
              </motion.div>

              {/* Personal Information and Contact Details */}
              <motion.div
                className="mb-8 sm:mb-12 md:mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight tracking-tight max-w-4xl mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Aaron Barlow
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl text-muted-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  He/Him
                </motion.p>
                <motion.p
                  className="text-xl sm:text-2xl font-medium mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  HPC Software Engineer @ Oak Ridge National Laboratory
                </motion.p>

                {/* Contact Information Links */}
                <motion.div
                  className="flex flex-wrap gap-4 text-base text-muted-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    <a
                      href="https://github.com/AroSwift/resume/blob/main/resume.pdf"
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
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Bio and Personal Statement */}
            <div className="lg:col-span-5 flex items-start lg:pt-0">
              <motion.div
                className="pt-0 w-full"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              >
                <motion.p
                  className="text-base sm:text-lg leading-relaxed mb-6 text-foreground/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Full-stack software engineer enabling the world's fastest
                  open-science supercomputers to operate at exascale. In my
                  spare time, I build fully autonomous agentic workflows. In
                  short: I build code that thinks and infrastructure that lasts.
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed mb-6 text-foreground/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  I am an experienced full-stack software engineer with over 9
                  years of experience delivering performant and well-tested
                  software. I love to solve problems, learn everything, mentor,
                  and take on high-impact projects!
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed mb-6 text-foreground/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  I'm especially passionate about designing fully autonomous,
                  AI-driven workflows that seamlessly integrate advanced machine
                  learning models, data pipelines, and automation systems. I
                  love creating self-sustaining systems that enable AI to make
                  decisions and take actions autonomously.
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg leading-relaxed mb-8 text-foreground/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  For me, software engineering is about solving problems that
                  make a real difference in the world. Whether it's building
                  AI-driven workflows or enabling open science on the world's
                  fastest supercomputer, I love tackling challenging problems!
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Professional Experience Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Experience
            </motion.h2>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.8 + index * 0.2,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <Card className="border-border/50 hover:shadow-lg transition-shadow duration-300 dark:card-enhanced dark:hover-enhanced">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-2xl font-bold">
                            {job.company}
                          </CardTitle>
                          <p className="text-xl text-muted-foreground">
                            {job.role}
                          </p>
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
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills and Technologies Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              Skills & Technologies
            </motion.h2>
            <motion.div
              className="flex flex-wrap gap-2 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.7, duration: 0.8, ease: 'easeOut' }}
            >
              {skills.map((skill, index) => (
                <motion.div
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
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Education Section */}
          <motion.section
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
                  className="border-border/50 dark:card-enhanced dark:hover-enhanced"
                >
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
          </motion.section>

          {/* Technical Talks Section */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 0.6 }}
            >
              Technical Talks
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {presentations.map((presentation, index) => (
                <motion.div
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
                      <p className="text-base leading-relaxed mb-4 text-foreground/90">
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
                          <Download className="h-4 w-4" />
                          Download Presentation
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Organizations & Community Involvement */}
          <motion.section
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0, duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-2xl sm:text-3xl font-normal mb-8 text-center dark:text-enhanced">
              Organizations & Community
            </h2>
            <div className="max-w-4xl mx-auto">
              <Card className="border-border/50 dark:card-enhanced dark:hover-enhanced">
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
                        <span className="text-muted-foreground mr-2 mt-1.5">
                          •
                        </span>
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Call-to-Action Buttons */}
          <motion.div
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
          </motion.div>

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
