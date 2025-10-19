import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export default function HueOverlay() {
  // Initialize with client-side check to avoid hydration mismatch
  const [mounted] = useState(() => typeof window !== 'undefined')

  if (!mounted) return null

  return createPortal(
    <div id="hue-overlay" aria-hidden="true">
      <div className="hue-layer hue-a" />
      <div className="hue-layer hue-b" />
    </div>,
    document.body
  )
}
