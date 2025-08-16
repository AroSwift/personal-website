// Tests for App component
// Verifies routing, loading screen logic, and page rendering

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render as testingLibraryRender, screen } from '@testing-library/react';
import App from '../App';

// Mock the components
vi.mock('../components/LoadingScreen', () => ({
  default: ({ onComplete }: { onComplete: () => void }) => (
    <div data-testid="loading-screen">
      <button onClick={onComplete}>Complete Loading</button>
    </div>
  ),
}));

vi.mock('../pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('../pages/AboutPage', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}));

vi.mock('../pages/ProjectsPage', () => ({
  default: () => <div data-testid="projects-page">Projects Page</div>,
}));

vi.mock('../pages/ContactPage', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>,
}));

describe('App', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    vi.clearAllMocks();
    (localStorage.getItem as any).mockReturnValue(null);
  });

  it('renders loading screen for first-time visitors', () => {
    (localStorage.getItem as any).mockReturnValue(null);
    testingLibraryRender(<App />);

    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
  });

  it('skips loading screen for returning visitors', () => {
    (localStorage.getItem as any).mockReturnValue('true');
    testingLibraryRender(<App />);

    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders with correct initial route', () => {
    (localStorage.getItem as any).mockReturnValue('true');
    testingLibraryRender(<App />);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
