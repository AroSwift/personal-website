// Test utilities for React components
// Provides custom render function with router context

import React from 'react'
import {
  render,
  RenderOptions,
  screen,
  waitFor,
  within,
  fireEvent,
  act,
} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Custom render function that includes router context
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <BrowserRouter>{children}</BrowserRouter>
  }

  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Export only the specific functions we need
export { customRender as render, screen, waitFor, within, fireEvent, act }
export type { RenderOptions }
