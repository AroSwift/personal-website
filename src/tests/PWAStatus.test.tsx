import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PWAStatus } from '../components/PWAStatus'

const mockUsePWA = vi.fn()

vi.mock('../lib/usePWA', () => ({
  usePWA: () => mockUsePWA(),
}))

describe('PWAStatus', () => {
  beforeEach(() => {
    mockUsePWA.mockReset()
  })

  it('renders nothing when running in standalone mode', () => {
    mockUsePWA.mockReturnValue({
      hasUpdate: true,
      isStandalone: true,
      updateServiceWorker: vi.fn(),
    })

    const { container } = render(<PWAStatus />)
    expect(container.firstChild).toBeNull()
  })

  it('does not show update toast when no update is available', () => {
    mockUsePWA.mockReturnValue({
      hasUpdate: false,
      isStandalone: false,
      updateServiceWorker: vi.fn(),
    })

    render(<PWAStatus />)
    expect(screen.queryByText('Update Available')).not.toBeInTheDocument()
  })

  it('shows update toast and calls updateServiceWorker on click', () => {
    const updateServiceWorker = vi.fn()
    mockUsePWA.mockReturnValue({
      hasUpdate: true,
      isStandalone: false,
      updateServiceWorker,
    })

    render(<PWAStatus />)

    expect(screen.getByText('Update Available')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Update & Reload' }))
    expect(updateServiceWorker).toHaveBeenCalledTimes(1)
  })
})
