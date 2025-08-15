import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const visited = localStorage.getItem('hasVisited');
    
    if (visited === 'true') {
      // User has visited before - skip loading screen
      setHasVisited(true);
      setIsLoading(false);
    } else {
      // First time visitor - show loading screen
      // Don't set hasVisited yet, let LoadingScreen handle it
    }
  }, []);

  const handleLoadingComplete = () => {
    // Mark as visited and hide loading screen
    localStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
    setIsLoading(false);
  };

  // Show loading screen only for first-time visitors
  if (isLoading && !hasVisited) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
