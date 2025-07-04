# Clove - Meal Planning Dashboard

## Overview

Clove is a modern meal planning web application built with React, TypeScript, and Express.js. The application helps users manage their food inventory, track meal plans, and organize cooking tasks through an intuitive dashboard interface. It features drag-and-drop meal management, inventory tracking with low-stock alerts, and a premium upgrade system for advanced features.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Drag & Drop**: React DnD with HTML5 backend for meal rearrangement
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API with JSON responses

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express.js backend application
├── shared/           # Shared TypeScript schemas and types
├── migrations/       # Database migration files
└── dist/            # Production build output
```

## Key Components

### Frontend Components
- **Dashboard**: Main application view with meal planning grid
- **Sidebar**: Inventory management and task tracking
- **MealCard**: Draggable meal components with cuisine and difficulty info
- **PremiumModal**: Upgrade prompts for premium features
- **UI Components**: Comprehensive design system using Shadcn/ui

### Backend Services
- **Storage Layer**: Abstract storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for dashboard data, meal operations
- **Session Management**: User session handling and authentication preparation

### Data Models
- **Inventory Items**: Food items with quantity tracking and status alerts
- **Meals**: Recipes with metadata (cuisine, difficulty, images)
- **Tasks**: Preparation and shopping tasks with time estimates
- **Days**: Weekly meal planning with action items

## Data Flow

1. **Client Request**: React components fetch data using TanStack Query
2. **API Layer**: Express routes handle requests and validate input with Zod
3. **Storage Layer**: Abstract storage interface manages data persistence
4. **Database**: PostgreSQL stores application data via Drizzle ORM
5. **Response**: JSON data flows back through the stack to update UI

### Key User Flows
- **Meal Planning**: View weekly meal grid, drag meals between slots
- **Inventory Management**: Track food items, receive low-stock alerts
- **Task Management**: View cooking prep and shopping tasks
- **Premium Features**: Upgrade prompts for advanced functionality

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-dnd**: Drag and drop functionality
- **wouter**: Lightweight routing
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Fast development server and bundler
- **typescript**: Static type checking
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling

## Deployment Strategy

### Development Mode
- **Frontend**: Vite dev server with HMR on the client directory
- **Backend**: tsx for TypeScript execution with file watching
- **Database**: Drizzle migrations for schema management

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Deployment**: Single Node.js process serves both API and static files
- **Database**: PostgreSQL connection via environment variable

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Session Management**: Prepared for authentication integration

## Changelog
- July 04, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.