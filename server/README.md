# Backend (FastAPI + Redis)

The backend API provides news article data with intelligent Redis caching for optimal performance and scalability.

## 🎯 Purpose

This FastAPI backend serves as the data layer for the news application:
- **API Endpoints**: RESTful endpoints for fetching news articles
- **Redis Caching**: Intelligent caching system for performance optimization
- **Dynamic Filtering**: Support for country, language, category, and text search
- **Query Building**: Advanced RediSearch query construction
- **Performance Metrics**: Request timing and cache hit/miss tracking

## ✨ Features

- **High Performance**: Redis caching reduces response times by up to 90%
- **Flexible Filtering**: Multi-parameter search and filtering
- **Cache Management**: Intelligent cache invalidation and refresh strategies
- **API Documentation**: Auto-generated OpenAPI/Swagger documentation
- **Error Handling**: Comprehensive error responses and logging
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Health Checks**: Endpoint monitoring and status reporting

## 🛠️ Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Redis**: In-memory data structure store for caching
- **RediSearch**: Full-text search and secondary indexing
- **Uvicorn**: Lightning-fast ASGI server
- **Pydantic**: Data validation using Python type annotations
- **Python 3.8+**: Modern Python with async/await support

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- Redis server (local or cloud)
- pip package manager

### 1. Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Environment Configuration
Create a `.env` file in the server directory. Chechout ```.env.example``` file for variables.


### 4. Run Development Server
\`\`\`bash
uvicorn app.app:app --reload --host 0.0.0.0 --port 8000
\`\`\`

The API will be available at `http://localhost:8000`

### 5. View API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### GET /latest-news
Fetch articles with optional filtering (uncached)

**Query Parameters:**
- `country` : Filter by country code (e.g., 'us', 'gb')
- `language` : Filter by language code (e.g., 'en', 'es')
- `category` : Filter by category (e.g., 'technology', 'sports')
- `cached` : Boolean on whether to fetch cached data

### Performance Benefits
- **Reduced API Calls**: Minimize external API usage and costs
- **Faster Response Times**: Cached responses are 90%+ faster
- **Better User Experience**: Instant loading for repeated queries
- **Scalability**: Handle more concurrent users with same resources
