// Tests for LoadingScreen component
// Verifies basic rendering and structure

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from './utils';
import LoadingScreen from '../components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading screen with name', () => {
    const mockOnComplete = vi.fn();
    render(<LoadingScreen onComplete={mockOnComplete} />);

    // Name is split into individual letters, so check for first letter
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('shows initial word', () => {
    const mockOnComplete = vi.fn();
    render(<LoadingScreen onComplete={mockOnComplete} />);

    expect(screen.getByText('Architect')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    const mockOnComplete = vi.fn();
    render(<LoadingScreen onComplete={mockOnComplete} />);

    // Progress bar should be present
    expect(document.querySelector('.w-32.h-0\\.5')).toBeInTheDocument();
  });

  it('accepts onComplete callback', () => {
    const mockOnComplete = vi.fn();
    render(<LoadingScreen onComplete={mockOnComplete} />);

    // Component should render without errors
    expect(screen.getByText('Architect')).toBeInTheDocument();
  });
});
