# Next.js + FastAPI News App with Redis Cache

A full-stack news application that demonstrates modern web development practices with intelligent caching and real-time performance metrics.

## Project Architecture

This is a full-stack project consisting of two main components:

- **`client/`** -> Frontend built with Next.js 14
- **`server/`** -> Backend built with FastAPI + Redis

## What This Project Does

This news application provides a comprehensive solution for browsing and filtering news articles with advanced performance optimization:

- **News Aggregation**: Fetches news articles from external APIs
- **Smart Filtering**: Supports filters for country, language, and category
- **Redis Caching**: Intelligent caching system to improve performance by up to 90%
- **Performance Insights**: Real-time comparison between cached and uncached requests
- **Modern UI**: Responsive design with smooth animations and loading states
- **External Navigation**: Direct links to original news sources

## Project Structure

```
news-app/
├── client/                 # Next.js Frontend
├───── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── README.md         # Frontend documentation
├── server/                # FastAPI Backend
├───── app/
│   ├── app.py           # FastAPI application
│   ├── config/           
│   ├── utils/        
├───── README.md         # Backend documentation
├───── .env.example/
└── README.md             # This file
```

## Quick Start

### Prerequisites
- **Node.js 18+** for the frontend
- **Python 3.8+** for the backend
- **Redis server** for caching

### 1. Clone the Repository
```bash
git clone https://github.com/R-kjim/fastnews-redis.git
cd fastnews-redis
```

### 2. Start the Backend (Terminal 1)
```bash
cd server
pip install -r requirements.txt
cp .env.example .env  #configure environment variables
uvicorn app.app:app --reload --port 8000
```

### 3. Start the Frontend (Terminal 2)
```bash
cd client
npm install
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Technology Stack

### Frontend (Next.js)
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library

### Backend (FastAPI)
- **FastAPI**: Modern Python web framework
- **Redis**: In-memory caching and search
- **RediSearch**: Full-text search capabilities
- **Pydantic**: Data validation and serialization
- **Uvicorn**: High-performance ASGI server

## Key Features

### Performance Optimization
- **Redis Caching**: Dramatically reduces API response times
- **Cache Toggle**: Compare cached vs uncached performance in real-time
- **Smart Invalidation**: Automatic cache refresh strategies

### Advanced Filtering
- **Multi-parameter Search**: Country, language, category, and cache choice search
- **Real-time Updates**: Instant filter application without page refresh

### User Experience
- **Responsive Design**: Mobile-first approach with smooth animations
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Graceful error messages and retry mechanisms

## Detailed Documentation

Each component has its own comprehensive README with detailed setup instructions:

- **[Frontend Documentation](client/README.md)**: Next.js setup, component architecture, and deployment
- **[Backend Documentation](server/README.md)**: FastAPI setup, Redis configuration, and API reference

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** in the appropriate directory (`client/` or `server/`)
4. **Follow the coding standards** outlined in each component's README
5. **Test thoroughly** on both frontend and backend
6. **Submit a pull request** with a clear description


**Ready to explore the future of news consumption with intelligent caching and modern web technologies!**
# fastnews-redis
