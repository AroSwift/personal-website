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
- **Local Build Speed**: 2.64s average (compile-only) - optimized chunking
- **Chunking Strategy**: 15+ granular chunks for optimal caching and loading performance

### Bundle Size

- **Main Bundle**: 9.13 kB (2.87 kB gzipped) - optimized chunking
- **Total Initial Load**: ~110 kB gzipped - efficient loading
- **Lazy Loading**: Pages load on-demand (~1-18 kB each)
- **Core Dependencies**: React core (72.38 kB gzipped) and vendor (16.25 kB gzipped) properly separated

### Chunking Strategy

The build system now generates **15+ optimized chunks** for better performance:

- **Core Chunks**: `react-core` (226.74 kB, 72.38 kB gzipped), `vendor` (43.80 kB, 16.25 kB gzipped), `utils` (26.17 kB, 8.42 kB gzipped)
- **Feature Chunks**: `animations` (80.42 kB, 26.12 kB gzipped), `components` (9.02 kB, 3.09 kB gzipped), `layout` (7.46 kB, 2.61 kB gzipped)
- **Page Chunks**: `page-home` (7.72 kB, 2.68 kB gzipped), `page-about` (18.56 kB, 5.48 kB gzipped), `page-projects` (8.12 kB, 2.83 kB gzipped), `page-contact` (6.32 kB, 2.00 kB gzipped)
- **Dynamic Imports**: Heavy libraries like Framer Motion are loaded on-demand to improve initial page load times

This granular approach ensures:

- **Better Caching**: Individual chunks can be cached independently
- **Faster Initial Load**: Only essential code is loaded upfront
- **Improved TTI**: Time to Interactive is reduced by deferring non-critical animations
- **Efficient Updates**: Users only download changed chunks on updates

### Page Speed Scores

| Metric                       | Desktop | Mobile |
| :--------------------------- | :-----: | :----: |
| **Speed Score**              | **100** | **99** |
| **Time To First Byte**       | 0.01s   | 0.01s  |
| **First Contentful Paint**   | 0.38s   | 1.66s  |
| **Largest Contentful Paint** | 0.42s   | 1.81s  |
| **Time to Interactive**      | 0.38s   | 1.67s  |
| **Total Blocking Time**      | 0s      | 0s     |
| **Speed Index**              | 0.38s   | 1.66s  |
| **Cumulative Layout Shift**  | 0s      | 0s     |

_Performance measured from Iowa, USA on 2025-08-22 by Cloudflare Observatory_

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

- **Advanced Code Splitting**: Intelligent manual chunk configuration with dynamic imports for optimal caching
- **Lazy Loading**: Route-based component loading with Suspense boundaries for faster initial page loads
- **Animation Optimization**: Framer Motion components dynamically imported to reduce initial bundle size
- **Granular Chunking**: Page-specific, component-specific, and dependency-specific chunks for better caching
- **Tree Shaking**: Automatic dead code elimination with enhanced dependency optimization
- **Bundle Analysis**: Rollup plugin visualizer for ongoing optimization monitoring and chunk size analysis
- **Minification**: ESBuild for fast and efficient code compression
- **Asset Optimization**: Optimized images, CSS compression, and intelligent chunk naming
- **Dynamic Imports**: Heavy libraries like Framer Motion loaded on-demand to improve Time to Interactive

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

This project is configured for deployment on Coolify with a fully code-owned Docker setup using docker-compose.yml for proper Traefik integration. I configured for zero-downtime rolling updates enabled.

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

The project uses Vite for building with advanced chunking optimization. Configuration can be modified in `vite.config.ts`.

#### Chunking Optimizations

The build system implements several key optimizations:

1. **Dynamic Imports**: Heavy components like `LoadingScreen` and `AboutPage` use dynamic imports to defer Framer Motion loading
2. **Granular Chunking**: Manual chunk configuration separates dependencies by type (core, UI, animations, utilities)
3. **Page-Level Splitting**: Each page is split into its own chunk for optimal loading
4. **Component Separation**: Layout and common components are separated from page-specific code
5. **Animation Deferral**: Framer Motion animations are loaded only when needed, reducing initial bundle size by 32%

#### Performance Impact

- **Initial Bundle**: 9.13 kB main bundle with optimized chunking strategy
- **Animation Loading**: Deferred until user interaction, improving Time to Interactive
- **Caching Efficiency**: 15+ chunks enable better browser caching strategies
- **Update Performance**: Users only download changed chunks on subsequent visits

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
