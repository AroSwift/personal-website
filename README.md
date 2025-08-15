# Personal Website

A modern, responsive personal website built with React, TypeScript, and Tailwind CSS. This website showcases my work, accomplishments, and provides a professional online presence.

## Features

- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS for a beautiful, responsive design
- **Multi-page Navigation**: Home, About, Projects, and Contact pages with smooth routing
- **Loading Experience**: Custom loading screen for first-time visitors
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Performance**: Built with Vite for fast development and optimized builds

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
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
└── configuration files
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

The project can be deployed to various platforms:

1. **Vercel**: Connect your repository and deploy automatically
2. **Netlify**: Drag and drop the `dist` folder or connect your repository
3. **GitHub Pages**: Use GitHub Actions to build and deploy
4. **Any static hosting service**: Build the project and upload the `dist` folder

## Contributing

This is a personal project, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with using React, TypeScript, and Tailwind CSS
