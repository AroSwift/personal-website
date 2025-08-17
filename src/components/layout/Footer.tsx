import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
  animationDelay?: number
  textColor?: string
  borderColor?: string
}

const Footer = ({ 
  className = '', 
  animationDelay = 1.2, 
  textColor = 'text-gray-600 dark:text-gray-400',
  borderColor = 'border-gray-300/50 dark:border-gray-600/50'
}: FooterProps) => {
  return (
    <motion.div
      className={cn(
        "pt-10 sm:pt-16 border-t transition-colors duration-800",
        borderColor,
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.8 }}
    >
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 text-lg transition-colors duration-800",
        textColor
      )}>
        <div>
          <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
            Location
          </h4>
          <p>Charlotte, NC (EST)</p>
          <p>Open to remote</p>
        </div>
        <div>
          <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
            Currently
          </h4>
          <p>HPC Software Engineer @ ORNL</p>
          <p>Building agentic AI workflows</p>
        </div>
        <div>
          <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
            Principles
          </h4>
          <p>Ship fast, then make it faster</p>
          <p>Automate the boring stuff</p>
        </div>
        <div>
          <h4 className="font-medium text-black dark:text-white mb-3 transition-colors duration-800">
            Source Code
          </h4>
          <a
            href="https://github.com/AroSwift/personal-website"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-fade-out hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"
          >
            View on GitHub
          </a>
          <p className="text-sm mt-1">Open source</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Footer
