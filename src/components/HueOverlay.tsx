import React from 'react'
import { createPortal } from 'react-dom'

export default function HueOverlay() {
  return createPortal(
    <div id="hue-overlay" aria-hidden="true">
      <div className="hue-layer hue-a" />
      <div className="hue-layer hue-b" />
    </div>,
    document.body
  )
}
