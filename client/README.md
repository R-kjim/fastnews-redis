# Frontend (Next.js)

The frontend of the News App provides an intuitive interface for browsing and filtering news articles with real-time performance metrics.

## Purpose

This Next.js application serves as the user interface for:
- **Browsing News**: Display articles in a clean, responsive grid layout
- **Smart Filtering**: Filter articles by country, language, and category
- **Performance Insights**: Show time taken to fetch articles (cached vs uncached)
- **External Navigation**: Click articles to visit their original source
- **Real-time Updates**: Live performance metrics and loading states

## Features

- **Responsive Design**: Mobile-first approach with smooth animations
- **Advanced Filtering**: Multi-select dropdowns for country, language, and category
- **Performance Toggle**: Switch between cached and uncached requests
- **Badge Display**: Visual indicators for article categories and languages
- **Loading States**: Skeleton loaders and smooth transitions
- **Error Handling**: Graceful error messages and retry mechanisms

## Tech Stack

- **Next.js 14**: React framework with App Router
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Lucide React**: Modern icon library

## Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### 1. Install Dependencies
```
npm install
# or
yarn install
```



### 2. Run Development Server
```
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production
```
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main news page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── article-card.tsx  # Individual article display
│   ├── article-list.tsx  # Article grid container
│   ├── filter-panel.tsx  # Filtering controls
│   └── performance-display.tsx # Performance metrics
├── lib/                  # Utility functions
│   └── utils.ts         # Common utilities
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Component Overview

### FilterPanel
- Country, language, and category dropdowns
- Cache toggle switch
- Real-time filter application

### ArticleCard
- Article thumbnail and metadata
- Category and language badges
- Clickable external links

### PerformanceDisplay
- Request timing metrics
- Cache hit/miss indicators
- Performance comparison charts

## Configuration

### API Integration
The app communicates with the FastAPI backend through:
- RESTful API calls
- Real-time performance tracking
- Error handling and retry logic

### Styling
- Tailwind CSS for utility-first styling
- shadcn/ui for consistent component design
- Custom CSS variables for theming
- Responsive breakpoints for mobile optimization


## 📄 API Reference

The frontend expects the following API endpoints from the backend:

- `GET /latest-news` - Fetch articles with filters
- Query parameters: `country`, `language`, `category`, `cached`
