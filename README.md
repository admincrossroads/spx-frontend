# Spiralytix Website

A modern, full-featured website for Spiralytix (SPX), an Africa-led development institution. Built with Next.js 16, TypeScript, and Tailwind CSS, featuring a public-facing website and a comprehensive admin dashboard for content management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Development Guidelines](#development-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The Spiralytix website consists of two main sections:

1. **Public Website**: A modern, responsive website showcasing SPX's work, insights, focus areas, and organizational information.
2. **Admin Dashboard**: A secure content management system for managing insights, authors, tags, and users.

### Key Highlights

- **Server-Side Rendering (SSR)**: Optimized performance with Next.js App Router
- **Content Management**: Rich text editor with drag-and-drop content blocks
- **Authentication**: Secure admin authentication with session management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Built-in theme switching support
- **Image Handling**: Optimized image loading with CORS support
- **Loading States**: Consistent loading animations across all pages

## ✨ Features

### Public Website

- **Homepage**: Hero section, organizational snapshot, approach overview, focus areas, flagship programs, innovation hub, projects preview, insights preview, partners, and CTA sections
- **About Pages**: Who We Are, Vision & Mission, Africa-Led Identity, Leadership & Team, Partners & Alliances, Where We Work
- **Approach Pages**: Strategic Advisory, Research & Evidence, Program Delivery, Innovation & Enterprise, MEL, Digital Transformation
- **Focus Areas**: Energy, Agriculture, Employment, Digital, Climate, Governance
- **Insights System**: 
  - Main insights listing page
  - Type-specific pages (Reports, Publications, Policy Briefs, Blogs)
  - Individual insight detail pages with rich content blocks
  - Recent insights sidebar
  - Image optimization and CORS handling

### Admin Dashboard

- **Authentication**: Secure login with role-based access (ADMIN, EDITOR)
- **Dashboard**: KPI overview with real-time data (Total Insights, Published, Authors, Tags)
- **Insights Management**:
  - Create, edit, and delete insights
  - Rich content editor with multiple block types (Text, Image, Video, Link, Quote, Table, SubTopic)
  - Drag-and-drop content block reordering
  - Publish/unpublish functionality
  - Cover image upload
  - Tag and author assignment
- **Authors Management**: Create, edit, and manage authors
- **Tags Management**: Create, edit, and manage tags with color coding
- **User Management**: Create, edit, and manage admin users with role assignment
- **Settings**: User account management and preferences

## 🛠 Tech Stack

### Core Technologies

- **Framework**: [Next.js 16.0.10](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Rich Text Editor**: [TipTap](https://tiptap.dev/)

### Key Dependencies

- `next-themes`: Dark mode support
- `date-fns`: Date formatting
- `jsonwebtoken`: JWT handling
- `@hello-pangea/dnd`: Drag and drop functionality
- `lucide-react`: Icon library
- `react-icons`: Additional icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Access to the Spiralytix backend API
- API key for backend authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spiralytix-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_API_KEY=your-api-key-here
   ```

   See [Environment Variables](#environment-variables) for detailed configuration.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes | `http://localhost:5000/api/v1` |
| `NEXT_PUBLIC_API_KEY` | API key for backend authentication | Yes | `your-api-key-here` |

### Environment-Specific Files

- `.env.local`: Local development (gitignored)
- `.env.development.local`: Development-specific overrides
- `.env.production.local`: Production-specific overrides

**Note**: Never commit `.env` files to version control. They are already included in `.gitignore`.

## 📁 Project Structure

```
spiralytix-site/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public website routes
│   │   ├── about/                # About pages
│   │   ├── approach/             # Approach pages
│   │   ├── focus-areas/          # Focus area pages
│   │   ├── insights/             # Insights pages
│   │   │   ├── [slug]/           # Individual insight pages
│   │   │   ├── blogs/            # Blog insights
│   │   │   ├── reports/           # Report insights
│   │   │   ├── publications/     # Publication insights
│   │   │   └── policy-briefs/    # Policy brief insights
│   │   ├── layout.tsx            # Public layout
│   │   └── page.tsx              # Homepage
│   ├── admin/                    # Admin dashboard routes
│   │   ├── (dashboard)/          # Protected admin routes
│   │   │   ├── insights/         # Insights management
│   │   │   ├── authors/          # Authors management
│   │   │   ├── tags/             # Tags management
│   │   │   ├── settings/         # Settings & users
│   │   │   └── page.tsx          # Admin dashboard
│   │   └── login/                # Admin login
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── loading.tsx               # Root loading component
├── components/                   # React components
│   ├── admin/                    # Admin components
│   │   ├── insights/             # Insight management components
│   │   ├── authors/              # Author management components
│   │   ├── tags/                 # Tag management components
│   │   └── ui/                   # Admin UI components
│   ├── home/                     # Homepage components
│   ├── about/                    # About page components
│   ├── approach/                 # Approach page components
│   ├── focus-areas/              # Focus area components
│   └── ui/                       # Shared UI components
├── lib/                          # Utility libraries
│   ├── api/                      # API client functions
│   │   ├── auth.ts               # Authentication API
│   │   ├── insights.ts           # Insights API (admin)
│   │   ├── public-insights.ts    # Public insights API
│   │   ├── authors.ts            # Authors API
│   │   ├── tags.ts               # Tags API
│   │   └── client.ts             # API client configuration
│   ├── actions/                  # Server actions
│   ├── auth/                     # Authentication utilities
│   └── utils/                    # Helper functions
├── public/                       # Static assets
│   ├── logos/                    # Company logos
│   └── images/                   # Image assets
├── types/                        # TypeScript type definitions
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🔌 API Integration

### Backend API Requirements

The frontend integrates with a RESTful backend API. All API requests require:

1. **Base URL**: Configured via `NEXT_PUBLIC_API_URL`
2. **API Key**: Required for all requests, sent via `x-api-key` header
3. **Authentication**: Admin routes require session-based authentication (httpOnly cookies)

### API Endpoints

#### Public Endpoints (No Authentication)

- `GET /insights?isPublished=true` - Fetch published insights
- `GET /insights/:slug` - Fetch insight by slug

#### Admin Endpoints (Authentication Required)

- `POST /auth/login` - Admin login
- `POST /auth/logout` - Admin logout
- `GET /auth/me` - Get current user
- `GET /admin/insights` - List all insights
- `POST /admin/insights` - Create insight
- `PUT /admin/insights/:id` - Update insight
- `DELETE /admin/insights/:id` - Delete insight
- `POST /admin/insights/:id/publish` - Publish insight
- `POST /admin/insights/:id/unpublish` - Unpublish insight
- `GET /admin/authors` - List authors
- `POST /admin/authors` - Create author
- `GET /admin/tags` - List tags
- `POST /admin/tags` - Create tag
- `GET /admin/users` - List users
- `POST /admin/users` - Create user

### API Client

The API client is configured in `lib/api/client.ts` and handles:
- Automatic API key injection
- Session cookie management
- Error handling
- Request/response interceptors

### Using the API

```typescript
// Public API (server-side)
import { getPublicInsights } from '@/lib/api/public-insights';

const insights = await getPublicInsights({ type: 'report', limit: 10 });

// Admin API (client-side)
import { api } from '@/lib/api/client';

const response = await api.get('/admin/insights');
```

## 💻 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled, prefer type safety
- **Components**: Use functional components with TypeScript
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: Co-locate related files, use index files for exports

### Component Patterns

#### Server Components (Default)

```typescript
// app/(public)/insights/page.tsx
export default async function InsightsPage() {
  const insights = await getPublicInsights();
  return <div>...</div>;
}
```

#### Client Components

```typescript
// components/home/InsightsPreview.tsx
'use client';

import { useState, useEffect } from 'react';

export default function InsightsPreview() {
  const [insights, setInsights] = useState([]);
  // ...
}
```

### Loading States

All routes have `loading.tsx` files that display the SPX loader animation during page transitions:

- Root: `app/loading.tsx`
- Public routes: `app/(public)/insights/loading.tsx`, etc.
- Admin routes: `app/admin/(dashboard)/loading.tsx`, etc.

### Image Handling

Images from the backend API are handled with:

1. **URL Normalization**: `lib/utils/helpers.ts` - `getImageUrl()` function
2. **Custom Component**: `components/ui/insight-image.tsx` - Handles CORS and loading errors
3. **Next.js Config**: `next.config.ts` - Remote image patterns

```typescript
import { getImageUrl } from '@/lib/utils/helpers';
import { InsightImage } from '@/components/ui/insight-image';

<InsightImage 
  src={getImageUrl(insight.coverImageUrl)} 
  alt={insight.title}
/>
```

### Form Handling

Forms use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Dark Mode**: Automatic theme switching with `next-themes`
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl)
- **Custom Components**: Radix UI primitives with Tailwind styling

### Error Handling

- **API Errors**: Handled in API client with user-friendly messages
- **Form Validation**: Client-side validation with Zod
- **Loading States**: Consistent loading animations
- **Error Boundaries**: Consider implementing for production

## 🚢 Deployment

### Build Process

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**
   
   Configure production environment variables in your hosting platform.

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the production server**
   ```bash
   npm start
   ```

### Deployment Platforms

#### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**: Configure build command: `npm run build`
- **AWS Amplify**: Automatic Next.js detection
- **Docker**: Create Dockerfile for containerized deployment
- **Self-hosted**: Run `npm run build && npm start` on your server

### Environment Variables for Production

Ensure these are set in your production environment:

```env
NEXT_PUBLIC_API_URL=https://api.spiralytix.com/api/v1
NEXT_PUBLIC_API_KEY=your-production-api-key
```

### Performance Optimization

- **Image Optimization**: Configured in `next.config.ts`
- **Code Splitting**: Automatic with Next.js App Router
- **Static Generation**: Used where applicable for public pages
- **Caching**: API responses cached appropriately

## 🐛 Troubleshooting

### Common Issues

#### 1. API Connection Errors

**Problem**: "Failed to fetch" or CORS errors

**Solutions**:
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check that `NEXT_PUBLIC_API_KEY` is set
- Ensure backend API is running and accessible
- Check CORS configuration on backend

#### 2. Image Loading Issues

**Problem**: Images not displaying

**Solutions**:
- Verify image URLs are absolute (use `getImageUrl()` helper)
- Check `next.config.ts` remote patterns
- Ensure backend allows image access
- Check browser console for CORS errors

#### 3. Authentication Issues

**Problem**: Cannot login or session expires

**Solutions**:
- Verify API endpoint is correct
- Check cookie settings (httpOnly, secure, sameSite)
- Clear browser cookies and try again
- Verify user account is active in backend

#### 4. Build Errors

**Problem**: Build fails with TypeScript errors

**Solutions**:
- Run `npm run lint` to check for errors
- Ensure all environment variables are set
- Check TypeScript version compatibility
- Clear `.next` folder and rebuild

#### 5. Loading Animation Not Showing

**Problem**: Pages load without animation

**Solutions**:
- Verify `loading.tsx` files exist in route directories
- Check that `SPXLoader` component is imported correctly
- Ensure minimum delay is set (1200ms default)

### Debug Mode

Enable verbose logging by checking browser console and terminal output. API requests include console logs for debugging.

## 📝 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TipTap Documentation](https://tiptap.dev/docs)

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 👥 Contributing

For internal development:
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

## 📧 Support

For questions or issues, contact the development team or refer to the backend API documentation.

---

**Last Updated**: 2024
**Version**: 0.1.0
