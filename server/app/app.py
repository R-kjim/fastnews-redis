from typing import Literal, Optional
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from redis.asyncio import Redis
import time
from app.utils.redis import get_redis
from app.utils.redis import redis_handler
from newsdataapi import NewsDataApiClient
from app.config.env_variables import env_variables
from fastapi.middleware.cors import CORSMiddleware
from app.utils.utils import countries, languages, categories

app = FastAPI(
    title = " FastNews: FastAPI + Redis Cache News Aggregator "
)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

client = NewsDataApiClient(
    apikey= env_variables.news_data_api
)

@app.get(
    "/latest-news"
)
async def get_latest_news(
    language: languages,
    country: countries,
    category: categories,
    cached: bool,
    background_tasks:BackgroundTasks,
    redis: Redis = Depends(get_redis)
):
    try:
        start = time.time()
        if cached:
            articles = await redis_handler.get_cached_articles(
                country= country,
                language= language,
                category= category
            )
            end = time.time()
            print(f"Fetched articles in {end - start}seconds while cached")
            return articles

        articles = client.latest_api(
            language= language,
            country= country,
            category= category
        )
        # create a background task (non-blocking)
        background_tasks.add_task(
            redis_handler.CacheListData,
            articles["results"]
        )
        end = time.time()
        print(f"Fetched articles in {end - start}seconds while not cached")
        return articles["results"]
    except Exception as e:
        print("Fetching articles error:\n", e)
        raise HTTPException(
            detail= str(e) or "Failed to fetch latest news articles",
            status_code= 400
        )