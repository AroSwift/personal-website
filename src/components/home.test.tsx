// Tests for Home component
// Verifies main content rendering and navigation links

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import Home from './home';

describe('Home', () => {
  it('renders main heading', () => {
    render(<Home />);

    expect(
      screen.getByText(/I build code that thinks and infrastructure that lasts/)
    ).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Home />);

    expect(screen.getByText('Selected Projects')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
  });

  it('renders current status information', () => {
    render(<Home />);

    expect(screen.getByText('Now')).toBeInTheDocument();
    expect(
      screen.getByText(/Developing agentic workflows/)
    ).toBeInTheDocument();
  });

  it('renders profile image', () => {
    render(<Home />);

    const profileImage = screen.getByAltText('Profile');
    expect(profileImage).toBeInTheDocument();
  });

  it('renders header component', () => {
    render(<Home />);

    // Header should be present (it renders navigation)
    expect(document.querySelector('header')).toBeInTheDocument();
  });
});
