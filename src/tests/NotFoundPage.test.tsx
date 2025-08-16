import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';

// Mock the Header component to avoid complex dependencies in tests
vi.mock('../components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NotFoundPage', () => {
  it('renders the 404 page with correct content', () => {
    renderWithRouter(<NotFoundPage />);
    
    // Check for main elements
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/Looks like you've ventured into uncharted territory/)).toBeInTheDocument();
  });



  it('has navigation buttons', () => {
    renderWithRouter(<NotFoundPage />);
    
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('includes additional helpful links', () => {
    renderWithRouter(<NotFoundPage />);
    
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    renderWithRouter(<NotFoundPage />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
