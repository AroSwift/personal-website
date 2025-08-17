# Personal Website - Aaron Barlow

A modern, responsive personal website for Aaron Barlow built with React, TypeScript, and Tailwind CSS. This website showcases my work, accomplishments, and provides a professional online presence.

**Live Site:** [aaronbarlow.dev](https://aaronbarlow.dev/)

## Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a beautiful, responsive design
- **Multi-page Navigation**: Home, About, Projects, and Contact pages with smooth routing
- **Loading Experience**: Custom loading screen for first-time visitors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Performance**: Built with Vite for fast development and optimized builds
- **PWA Support**: Progressive Web App with offline functionality and installation capabilities

## Performance & Build Metrics

### Build Performance

- **Production Deployment Time**: 18s (average of 5 runs)
- **Local Build Speed**: 1.51s average (compile-only)

### Bundle Size

- **Main Bundle**: 193 kB (61 kB gzipped)
- **Total Initial Load**: ~130 kB gzipped
- **Lazy Loading**: Pages load on-demand (~3-19 kB each)

### Page Speed Scores

| Metric                       | Desktop | Mobile |
| :--------------------------- | :-----: | :----: |
| **Speed Score**              | **100** | **99** |
| **Time To First Byte**       |  0.01s  | 0.01s  |
| **First Contentful Paint**   |  0.39s  | 1.72s  |
| **Largest Contentful Paint** |  0.39s  | 1.72s  |
| **Time to Interactive**      |  0.39s  | 1.86s  |
| **Total Blocking Time**      |   0ms   |  23ms  |
| **Speed Index**              |  0.43s  | 1.72s  |
| **Cumulative Layout Shift**  |    0    |   0    |

_Performance measured from Iowa, USA on 2025-08-17 by Cloudflare_

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM with lazy loading
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Forms**: React Hook Form
- **Database**: Supabase (configured for future use)

### Build Optimizations

- **Code Splitting**: Manual chunk configuration for optimal caching
- **Lazy Loading**: Route-based component loading for faster initial page loads
- **Tree Shaking**: Automatic dead code elimination
- **Bundle Analysis**: Rollup plugin visualizer for ongoing optimization monitoring
- **Minification**: ESBuild for fast and efficient code compression
- **Asset Optimization**: Optimized images and CSS compression

## Project Structure

```
personal-website/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── layout/                    # Layout components
│   │   └── LoadingScreen.tsx          # Splash screen
│   ├── pages/                         # Page components
│   │   ├── HomePage.tsx               # Home page
│   │   ├── AboutPage.tsx              # About page
│   │   ├── ProjectsPage.tsx           # Projects page
│   │   └── ContactPage.tsx            # Contact page
│   ├── lib/                           # Utility functions and custom hooks
│   │   ├── utils.ts                   # General utility functions
│   │   ├── usePWA.ts                  # PWA functionality hook
│   │   └── useScrollToTop.ts          # Scroll behavior hook
│   ├── types/                         # TypeScript type definitions
│   └── App.tsx                        # Main application component
├── public/                            # Static assets
├── dist/                              # Build output
├── Dockerfile                         # Docker configuration
├── nginx.conf                         # Nginx configuration
├── docker-compose.yml                 # Docker Compose for production
├── docker-compose.local.yml           # Docker Compose for local testing
└── configuration files
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Docker (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-website.git
   cd personal-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:5173` or similar)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve production build locally
- `npm test` - Run tests in watch mode

## Testing

The project includes a comprehensive test suite built with Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test

# Run specific test file
npm test -- --run src/tests/home.test.tsx
```

### Test Coverage

The test suite covers:

- **Component Rendering**: Verifies components render correctly
- **User Interactions**: Tests button clicks and navigation
- **Routing Logic**: Ensures proper page routing
- **Loading States**: Tests loading screen functionality
- **Content Validation**: Checks for expected text and elements

## Pages

- **Home**: Landing page with introduction and key highlights
- **About**: Personal information, skills, and background
- **Projects**: Portfolio of work and projects
- **Contact**: Contact information and form

## Deployment

### Coolify Deployment (Recommended)

This project is configured for deployment on Coolify with a fully code-owned Docker setup using docker-compose.yml for proper Traefik integration.

#### Coolify Setup Steps:

1. In Coolify dashboard, create a new application
2. Connect your Git repository
3. Set **Application Type** to "Dockerfile"
4. Set **Port** to "80" (HTTP only)
5. Add your domain(s): `aaronbarlow.dev` and `www.aaronbarlow.dev`
6. Deploy!

### Local Docker Testing

Test the Docker setup locally:

```bash
# Build and run with Docker Compose for local development
docker-compose -f docker-compose.local.yml up --build

# Or build and run manually (for local development)
docker build -t personal-website .
docker run -p 3000:80 personal-website
```

Then visit `http://localhost:3000`

### Alternative Static Hosting

The project can also be deployed to various static hosting platforms:

1. **Vercel**: Connect your repository and deploy automatically
2. **Netlify**: Drag and drop the `dist` folder or connect your repository
3. **GitHub Pages**: Use GitHub Actions to build and deploy
4. **Any static hosting service**: Build the project and upload the `dist` folder

**Note**: For static hosting, you'll need to configure the hosting provider to handle SPA routing (similar to the nginx `try_files` directive).

## Configuration

### Environment Variables

If you plan to use Supabase or other external services, create a `.env` file in the root directory and add your configuration variables.

### Build Configuration

The project uses Vite for building. Configuration can be modified in `vite.config.ts`.

### Nginx Configuration

The `nginx.conf` file handles:

- HTTPS/SSL configuration with automatic HTTP to HTTPS redirect
- SPA routing (React Router support)
- Static asset caching
- Security headers (including HSTS)
- Gzip compression
- Proxy headers for CDN/reverse proxy compatibility

## Contributing

This is a personal project, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with using React, TypeScript, and Tailwind CSS
