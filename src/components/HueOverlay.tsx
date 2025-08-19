import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function HueOverlay() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null

  return createPortal(
    <div id='hue-overlay' aria-hidden='true'>
      <div className='hue-layer hue-a' />
      <div className='hue-layer hue-b' />
    </div>,
    document.body
  )
}
