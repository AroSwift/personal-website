import React from 'react'
import { Link } from 'react-router-dom'

type LinkRollProps = {
  to: string
  children: React.ReactNode
  className?: string
  'data-testid'?: string
  onClick?: () => void
}

function splitGraphemes(text: string) {
  if (typeof (Intl as any).Segmenter === 'function') {
    const seg = new (Intl as any).Segmenter('en', { granularity: 'grapheme' })
    return Array.from(seg.segment(text), (s: any) => s.segment)
  }
  // Fallback – not perfect for all scripts but OK if Segmenter missing
  return Array.from(text)
}

export default function LinkRoll({ to, children, className = '', onClick, ...rest }: LinkRollProps) {
  const text = String(children ?? '')
  const chars = splitGraphemes(text)

  return (
    <Link
      to={to}
      className={`LinkRoll relative inline-block align-top ${className}`}
      aria-label={text}
      onClick={onClick}
      {...rest}
    >
      <span className='LinkRoll-text inline-block align-top'>
        {chars.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className='LinkRoll-char inline-block relative overflow-hidden align-top'
            style={{ ['--idx' as any]: i }}
            aria-hidden='true'
          >
            <span className='LinkRoll-glyph LinkRoll-glyph-original block'>
              {ch}
            </span>
            <span className='LinkRoll-glyph LinkRoll-glyph-new block absolute left-0'>
              {ch}
            </span>
          </span>
        ))}
      </span>
    </Link>
  )
}
