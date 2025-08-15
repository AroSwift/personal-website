// Tests for HomePage component
// Verifies basic rendering and component integration

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import HomePage from './HomePage';

// Mock the Home component
vi.mock('@/components/home', () => ({
  default: () => <div data-testid="home-component">Home Component</div>,
}));

describe('HomePage', () => {
  it('renders Home component', () => {
    render(<HomePage />);

    expect(screen.getByTestId('home-component')).toBeInTheDocument();
  });
});
