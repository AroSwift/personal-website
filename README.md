# Personal Website - Aaron Barlow

A modern, responsive personal website for Aaron Barlow built with React, TypeScript, and Tailwind CSS. This website showcases my work, accomplishments, and provides a professional online presence.

**Live Site:** [aaronbarlow.dev](https://aaronbarlow.dev/)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or bun
- Docker (for deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AroSwift/personal-website.git
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
- `npm run build` - Build for production and generate sitemap
- `npm run build:check` - Type-check, build, and generate sitemap
- `npm run indexnow` - Ping search engines via IndexNow
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve production build locally on port 3000
- `npm test` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format with Prettier
- `npm run format:check` - Check formatting

## Testing

The project includes a comprehensive test suite built with Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests in watch mode (default)
npm test

# Run all tests once (CI mode)
npm test -- --run

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- --run src/tests/home.test.tsx

# Run tests matching a pattern
npm test -- --run --grep "HomePage"
```

### Test Coverage

The test suite covers component rendering, user interactions, routing logic, loading states, and content validation. Coverage reports are generated in multiple formats and saved to the `coverage/` directory.

## Deployment

### Dokploy Deployment

This project is configured for deployment on Dokploy with a fully code-owned Docker setup using docker-compose.yml for proper Traefik integration and zero-downtime rolling updates.

#### Dokploy Setup Steps:

1. Install Dokploy on your server:

   ```bash
   curl -sSL https://dokploy.com/install.sh | sh
   ```

2. In Dokploy dashboard, create a new application
3. Connect your Git repository
4. Set **Build Type** to "Dockerfile"
5. Set **Port** to "80"
6. Add your domain(s) e.g.: `aaronbarlow.dev` and `www.aaronbarlow.dev`
7. Deploy!

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

## Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a beautiful, responsive design
- **Multi-page Navigation**: Home, About, Projects, and Contact pages with smooth routing
- **Loading Experience**: Custom loading screen for first-time visitors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Performance**: Built with Vite for fast development and optimized builds
- **PWA Support**: Progressive Web App with offline functionality and installation capabilities
- **SEO**: Sitemap, robots.txt, IndexNow, llms.txt

## Performance & Build Metrics

### Build Performance

- **Production Deployment Time**: 18s (average of 5 runs)
- **Local Build Speed**: 2.64s average (compile-only) - optimized chunking
- **Chunking Strategy**: 15+ granular chunks for optimal caching and loading performance

### Bundle Size

- **Main Bundle**: ~9.4 kB (~3 kB gzipped) - optimized chunking
- **Total Initial Load**: ~110 kB gzipped - efficient loading
- **Lazy Loading**: Pages load on-demand (~1–20 kB each)
- **Core Dependencies**: React core (~75 kB gzipped) and vendor (~23 kB gzipped) properly separated

### Chunking Strategy

The build system generates **15+ optimized chunks** for better performance:

- **Core Chunks**: `react-core` (~233 kB, ~75 kB gzipped), `vendor` (~66 kB, ~23 kB gzipped), `utils` (~27 kB, ~8.6 kB gzipped)
- **Feature Chunks**: `animations` (~18 kB, ~7 kB gzipped) using LazyMotion + domAnimation, `components` (~9 kB, ~3.2 kB gzipped), `layout` (~7.5 kB, ~2.6 kB gzipped)
- **Page Chunks**: `page-home` (~7.8 kB, ~2.7 kB gzipped), `page-about` (~19.5 kB, ~5.7 kB gzipped), `page-projects` (~15 kB, ~4.5 kB gzipped), `page-contact` (~6.4 kB, ~2 kB gzipped), `page-404` (~3 kB, ~1.1 kB gzipped)
- **Animation Optimization**: Framer Motion uses `LazyMotion`, the `m` component, and `domAnimation` (~18 kB, ~7 kB gzipped)

This granular approach ensures:

- **Better Caching**: Individual chunks can be cached independently
- **Faster Initial Load**: Only essential code is loaded upfront
- **Improved TTI**: Time to Interactive is reduced by deferring non-critical animations
- **Efficient Updates**: Users only download changed chunks on updates

### Page Speed Scores

| Metric                       | Desktop | Mobile |
| :--------------------------- | :-----: | :----: |
| **Speed Score**              | **100** | **99** |
| **Time To First Byte**       |  0.01s  | 0.01s  |
| **First Contentful Paint**   |  0.38s  | 1.66s  |
| **Largest Contentful Paint** |  0.42s  | 1.81s  |
| **Time to Interactive**      |  0.38s  | 1.67s  |
| **Total Blocking Time**      |   0s    |   0s   |
| **Speed Index**              |  0.38s  | 1.66s  |
| **Cumulative Layout Shift**  |   0s    |   0s   |

_Performance measured from Iowa, USA on 2025-08-22 by Cloudflare Observatory_

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Routing**: React Router DOM with lazy loading
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion (LazyMotion + `m` + domAnimation)
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Build Optimizations

- **Advanced Code Splitting**: Intelligent manual chunk configuration with dynamic imports for optimal caching
- **Lazy Loading**: Route-based component loading with Suspense boundaries for faster initial page loads
- **Animation Optimization**: Framer Motion components dynamically imported to reduce initial bundle size
- **Granular Chunking**: Page-specific, component-specific, and dependency-specific chunks for better caching
- **Tree Shaking**: Automatic dead code elimination with enhanced dependency optimization
- **Bundle Analysis**: Rollup plugin visualizer for ongoing optimization monitoring and chunk size analysis
- **Minification**: ESBuild for fast and efficient code compression
- **Asset Optimization**: Optimized images, CSS compression, and intelligent chunk naming
- **Dynamic Imports**: Route-based lazy loading for pages to improve Time to Interactive

## Project Structure

```
personal-website/
├── src/
│   ├── components/                    # Reusable UI components
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── layout/                    # Layout components
│   │   ├── HueOverlay.tsx
│   │   ├── LinkRoll.tsx
│   │   ├── LinkRoll.test.tsx
│   │   ├── LoadingScreen.tsx
│   │   └── PWAStatus.tsx
│   ├── pages/                         # Page components
│   │   ├── about/                     # About page modules
│   │   │   ├── aboutData.ts           # Skills, experience, education, etc.
│   │   │   ├── AboutHero.tsx          # Profile, contact, bio
│   │   │   ├── AboutExperience.tsx    # Work experience cards
│   │   │   ├── AboutSkills.tsx        # Skills & technologies
│   │   │   ├── AboutEducation.tsx     # Education cards
│   │   │   ├── AboutPresentations.tsx # Technical talks
│   │   │   └── AboutOrganizations.tsx # Leadership & community
│   │   ├── HomePage.tsx               # Home page
│   │   ├── AboutPage.tsx              # About page (composes about/*)
│   │   ├── ProjectsPage.tsx           # Projects page
│   │   ├── ContactPage.tsx            # Contact page
│   │   └── NotFoundPage.tsx           # 404 page
│   ├── lib/                           # Utility functions and custom hooks
│   │   ├── utils.ts                   # General utility functions
│   │   └── usePWA.ts                  # PWA functionality hook
│   ├── tests/                         # Vitest + React Testing Library
│   └── App.tsx                        # Main application component
├── scripts/
│   ├── generate-sitemap.js
│   ├── indexnow-ping.js
│   └── site-urls.js
├── public/                            # Static assets (favicons, images, manifest, service-worker, sitemap, robots, PWA assets, presentations)
├── dist/                              # Build output (includes stats.html for bundle analysis)
├── Dockerfile                         # Docker configuration
├── nginx.conf                         # Nginx configuration
├── docker-compose.yml                 # Docker Compose for production
├── docker-compose.local.yml           # Docker Compose for local testing
└── configuration files
```

## Pages

- **Home**: Landing page with introduction and key highlights
- **About**: Personal information, skills, experience, education, technical talks, and community involvement
- **Projects**: Portfolio of work and projects
- **Contact**: Contact information and form

## Configuration

### Environment Variables

For optional external services, create a `.env` file in the project root and add the required variables.

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

- **Animation Loading**: Deferred until user interaction, improving Time to Interactive
- **Initial Bundle**: ~9.4 kB main bundle with optimized chunking strategy
- **Caching Efficiency**: 15+ chunks enable better browser caching strategies
- **Update Performance**: Users only download changed chunks on subsequent visits

### Nginx Configuration

The `nginx.conf` file handles:

- SPA routing (React Router support)
- Static asset caching
- Security headers (including HSTS)
- Gzip compression
- Proxy headers for CDN/reverse proxy compatibility

## Contributing

This is a personal project, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE). If you use this code or design as inspiration for your own project, please give credit to Aaron Barlow.

---

Built with React, TypeScript, and Tailwind CSS
