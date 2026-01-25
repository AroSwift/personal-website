import React from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'

const NotFoundPage = () => {
  // Animation variants for the floating elements
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
      },
    },
  }

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main content with proper spacing for fixed header */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated 404 illustration */}
          <m.div
            className="relative mb-12"
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            {/* Large 404 text with gradient */}
            <m.h1
              className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-gradient mb-8 mt-32"
              variants={itemVariants}
            >
              404
            </m.h1>

            {/* Floating elements around the 404 */}
            <m.div
              className="absolute top-1/4 left-1/4 w-4 h-4 bg-muted-foreground/20 rounded-full"
              variants={floatingVariants}
              animate="float"
            />
            <m.div
              className="absolute top-1/3 right-1/4 w-3 h-3 bg-muted-foreground/30 rounded-full"
              variants={floatingVariants}
              animate="float"
              style={{ animationDelay: '1s' }}
            />
            <m.div
              className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-muted-foreground/40 rounded-full"
              variants={floatingVariants}
              animate="float"
              style={{ animationDelay: '2s' }}
            />
            <m.div
              className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-muted-foreground/25 rounded-full"
              variants={floatingVariants}
              animate="float"
              style={{ animationDelay: '0.5s' }}
            />
          </m.div>

          {/* Main message */}
          <m.div className="mb-12 mt-8" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Looks like you've ventured into uncharted territory. The page
              you're looking for doesn't exist or has been moved.
            </p>
          </m.div>

          {/* Action buttons */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="px-8 py-3 text-lg font-medium">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              <Link to="/about">
                <ArrowLeft className="w-5 h-5 mr-2" />
                About Me
              </Link>
            </Button>
          </m.div>

          {/* Additional helpful links */}
          <m.div
            className="mt-12 pt-8 border-t border-border/30"
            variants={itemVariants}
          >
            <p className="text-muted-foreground mb-4">
              Or explore these popular sections:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/projects"
                className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
              >
                Projects
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                to="/contact"
                className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
              >
                Contact
              </Link>
            </div>
          </m.div>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
