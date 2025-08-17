import React, { useEffect } from 'react'

const HueOverlay: React.FC = () => {
  useEffect(() => {
    // Create overlay elements and append to document body
    const overlays = [
      { className: 'animated-hue-overlay', id: 'hue-overlay-1' },
      { className: 'animated-hue-overlay-slow', id: 'hue-overlay-2' },
      { className: 'animated-hue-overlay-fast', id: 'hue-overlay-3' },
      { className: 'animated-hue-overlay-ultra-slow', id: 'hue-overlay-4' },
    ]

    overlays.forEach(({ className, id }) => {
      const overlay = document.createElement('div')
      overlay.className = className
      overlay.id = id
      document.body.appendChild(overlay)
    })

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollYVh = (scrollY / window.innerHeight) * 100
      document.documentElement.style.setProperty('--scroll-y', `${scrollYVh}`)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Clean up overlays
      overlays.forEach(({ id }) => {
        const overlay = document.getElementById(id)
        if (overlay) {
          document.body.removeChild(overlay)
        }
      })
    }
  }, [])

  // Return null since we're rendering overlays directly to body
  return null
}

export default HueOverlay
