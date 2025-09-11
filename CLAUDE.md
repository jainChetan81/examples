# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js project using TypeScript and Bun as the package manager.

- `bun dev` - Start development server with Turbo mode enabled
- `bun run build` - Build the production application
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint to check code quality
- `bun install` - Install dependencies using Bun

## Project Architecture

This is a Next.js application with a pages-based routing system featuring several key architectural components:

### Directory Structure

- `src/pages/` - Next.js pages with file-based routing
- `src/components/` - Reusable React components organized by feature
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions and helpers
- `src/types/` - TypeScript type definitions
- `src/styles/` - Global styles, SCSS modules, and CSS files
- `src/env/` - Environment variable validation using Zod schemas

### Key Technologies

- **Frontend**: React 19 with Next.js 15, TypeScript, Material-UI, TailwindCSS
- **State Management**: React Query for server state, React Hook Form for forms
- **Styling**: TailwindCSS (primary), SCSS modules, Material-UI components
- **Development**: Bun runtime, ESLint with TypeScript rules, React Compiler enabled

### Important Configuration

- React Strict Mode is disabled (`reactStrictMode: false`)
- React Compiler experimental feature is enabled
- Custom webpack configuration for tree-shaking index files
- Environment validation enforced in `next.config.mjs`
- TypeScript with strict mode and `noUncheckedIndexedAccess` enabled

### Component Patterns

- Form components extensively use React Hook Form with Zod validation
- Custom loading states with route change detection
- Modular component architecture with feature-based organization
- React Flow integration for diagram/flowchart functionality
- **Styling Approach**: Use TailwindCSS utility classes for component styling. Only use SCSS for complex animations or legacy components.

### TailwindCSS Guidelines

- **Primary styling method**: Use Tailwind utility classes for all new components
- **Responsive design**: Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- **Custom styles**: Extend Tailwind config or use CSS custom properties when needed
- **Avoid inline styles**: Prefer Tailwind classes over style props
- **Component composition**: Use Tailwind classes to build reusable component variants

### Environment Setup

Copy `.env.example` to `.env` and populate with any required environment variables. The env validation system will prevent builds with invalid variables.
