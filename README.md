# Personal Website - Aaron Barlow

A modern, responsive personal website for Aaron Barlow built with React, TypeScript, and Tailwind CSS. This website showcases my work, accomplishments, and provides a professional online presence.

## Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a beautiful, responsive design
- **Multi-page Navigation**: Home, About, Projects, and Contact pages with smooth routing
- **Loading Experience**: Custom loading screen for first-time visitors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Performance**: Built with Vite for fast development and optimized builds
- **PWA Support**: Progressive Web App with offline functionality and installation capabilities

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Forms**: React Hook Form
- **Database**: Supabase (configured for future use)

## Project Structure

```
personal-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components (Header, etc.)
│   │   └── LoadingScreen.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ContactPage.tsx
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main application component
├── public/                 # Static assets
├── dist/                   # Build output
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration
├── docker-compose.yml      # Docker Compose for production (Coolify)
├── docker-compose.local.yml # Docker Compose for local testing
├── .dockerignore           # Docker ignore file
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

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run serve` - Serve production build locally
- `npm test` - Run tests in watch mode

## Testing

The project includes a comprehensive test suite built with Vitest and React Testing Library.

### Test Structure

```
src/
├── test/
│   ├── setup.tsx          # Test configuration and mocks
│   └── utils.tsx          # Custom test utilities
├── components/
│   ├── home.test.tsx      # Home component tests
│   └── LoadingScreen.test.tsx  # Loading screen tests
├── pages/
│   └── HomePage.test.tsx  # Page component tests
└── App.test.tsx           # Main app tests
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test

# Run specific test file
npm test -- --run src/components/home.test.tsx
```

### Test Coverage

The test suite covers:
- **Component Rendering**: Verifies components render correctly
- **User Interactions**: Tests button clicks and navigation
- **Routing Logic**: Ensures proper page routing
- **Loading States**: Tests loading screen functionality
- **Content Validation**: Checks for expected text and elements

### Writing Tests

Tests follow React Testing Library best practices:
- Test behavior, not implementation
- Use semantic queries (getByText, getByRole)
- Keep tests simple and focused
- Mock external dependencies appropriately

## Customization

### Styling
The project uses Tailwind CSS with a custom configuration. The base color scheme is set to "slate" and can be modified in `tailwind.config.js`.

### Components
UI components are built using shadcn/ui, which provides a collection of reusable, accessible components. New components can be added using the shadcn/ui CLI.

### Pages
Each page is located in the `src/pages/` directory. You can modify the content, styling, and functionality of each page to match your personal brand.

## Pages

- **Home**: Landing page with introduction and key highlights
- **About**: Personal information, skills, and background
- **Projects**: Portfolio of work and projects
- **Contact**: Contact information and form

## Configuration

### Environment Variables
If you plan to use Supabase or other external services, create a `.env` file in the root directory and add your configuration variables.

### Build Configuration
The project uses Vite for building. Configuration can be modified in `vite.config.ts`.

## Deployment

### Coolify Deployment (Recommended)

This project is configured for deployment on Coolify with a fully code-owned Docker setup using docker-compose.yml for proper Traefik integration.

#### Coolify Configuration:

1. **App Type**: Select "Dockerfile" (not Buildpack/Static)
2. **Expose Port**: 80 (HTTP only - no port publishing needed)
3. **Domain**: Attach your domain (e.g., `aaronbarlow.dev`) to this app only
4. **SSL**: Handled automatically by Traefik with Let's Encrypt certificates

#### Coolify Setup Steps:

1. In Coolify dashboard, create a new application
2. Connect your Git repository
3. Set **Application Type** to "Dockerfile"
4. Set **Port** to "80" (HTTP only)
5. Add your domain(s): `aaronbarlow.dev` and `www.aaronbarlow.dev`
6. **Important**: The docker-compose.yml file handles Traefik integration automatically
7. Deploy!

#### How It Works:

The docker-compose.yml file includes:
- **Traefik labels** for automatic routing and SSL termination
- **Coolify network** integration for proper container communication
- **No port publishing** - Traefik communicates directly over Docker network
- **Health checks** for container monitoring

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

**Note**: 
- The main `docker-compose.yml` includes Traefik labels for production deployment with Coolify
- Use `docker-compose.local.yml` for local testing (includes port publishing and health checks)
- The health check endpoint is available at `http://localhost:3000/health`

### SSL Certificate Options

For production deployment, you have several SSL certificate options:

**Option A: Origin Certificate (Recommended)**
- Generate a certificate from your domain provider
- Mount the certificate and private key in your Docker container
- Provides long-term validity and optimal performance

**Option B: Let's Encrypt (Automatic)**
- Let your reverse proxy handle automatic certificate generation
- Certificates auto-renew every 90 days
- Works well with Traefik and similar tools

**Option C: Self-Signed (Development Only)**
- The container generates self-signed certificates automatically
- Suitable for local development and testing
- Not recommended for production use

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the Docker image
docker build -t personal-website .

# Run the container
docker run -d -p 80:80 -p 443:443 --name personal-website-site personal-website
```

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

## Troubleshooting

### 404 Errors on Subpages
If you're getting 404 errors on routes like `/projects`, ensure:
1. You're using the Dockerfile deployment (not static hosting)
2. The nginx.conf file is properly configured with `try_files $uri $uri/ /index.html;`
3. Only one app is bound to your domain in Coolify

### 502 Bad Gateway Errors
If you're getting 502 errors in Coolify:
1. **Check docker-compose.yml**: Ensure it includes the `coolify` external network
2. **Verify Traefik labels**: Make sure all required Traefik labels are present
3. **No port publishing**: The docker-compose.yml should NOT publish ports to the host
4. **Single domain binding**: Ensure only this app is bound to your domain in Coolify
5. **Check container logs**: Look for access logs when visiting the site

### Container Health Checks
To verify the container is running properly:
```bash
# Check if container is listening on port 80
docker exec <container-name> ss -lntp

# Check nginx logs
docker logs <container-name>
```

### Build Issues
If you encounter build issues:
```bash
# Clean and rebuild
docker system prune -f
docker build --no-cache -t personal-website .
```

## Contributing

This is a personal project, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with using React, TypeScript, and Tailwind CSS
