from typing import AnyStr, Dict, List, Literal, Optional
from fastapi import HTTPException, status
from redis.asyncio import Redis
from app.config.env_variables import env_variables
import asyncio
from redis.commands.search import Search
from redis.commands.search.query import Query
from redis.commands.search.field import TextField
from redis.commands.search.index_definition import IndexDefinition
from redis import Redis as SyncRedis
import json
from app.utils.utils import countries, languages, categories
import pycountry


async def get_redis() -> Redis:
    """ Establishes an asynchronous Redis connection """
    try:
        redis = await Redis(
            host= env_variables.redis_host,
            port= env_variables.redis_port
        )
        return redis
    except Exception as e:
        raise HTTPException(
            status_code= status.HTTP_400_BAD_REQUEST,
            detail= str(e) or "Failed to establish redis connection"
        )


class RedisHandler:
    """ Comprehensive Redis Handlers """

    def __init__(self):
        self.redis_client: Redis  = Redis(
            host= env_variables.redis_host,
            port= env_variables.redis_port,
            decode_responses= True
        )

        self.ft: Search = SyncRedis(
            host= env_variables.redis_host,
            port= env_variables.redis_port,
            decode_responses= True
        ).ft("index_articles")

        try:
            # self.ft.dropindex(delete_documents=True)
            self.ft.create_index(
                fields= [
                    TextField("country"),
                    TextField("category"),
                    TextField("language")
                ],
                definition=IndexDefinition(prefix=["article:"]),
            )             
 
        except Exception as e:
            print(e)
            pass

    def _to_redis_safe(self, data: dict) -> dict:
        """Convert dict values into Redis-safe (string) values"""
        safe = {}
        for k, v in data.items():
            if isinstance(v, bool):
                safe[k] = str(v).lower()  # "true"/"false"
            elif v is None:
                safe[k] = ""  # represent nulls as empty string
            elif isinstance(v, (str, int, float)):
                safe[k] = v
            else:
                safe[k] = json.dumps(v)  # lists, dicts, dates, UUIDs
        return safe

    def _from_redis_safe(self, data: dict) -> dict:
        """Convert Redis strings back into Python values"""
        parsed = {}
        for k, v in data.items():
            if v == "true":
                parsed[k] = True
            elif v == "false":
                parsed[k] = False
            elif v == "":
                parsed[k] = None
            else:
                try:
                    parsed[k] = json.loads(v)
                except Exception:
                    parsed[k] = v
        return parsed
    
    async def CacheListData(
            self,
            data: List[Dict[AnyStr, any]],
    ):
        """ Caches a list of dicts to redis"""
        for item in data:
            await self.redis_client.hset(
                name= f"article:{item['article_id']}",
                mapping= self._to_redis_safe(item)
            )
        return

    async def get_cached_articles(
            self,
            language: languages,
            country:countries,
            category:categories,
            page:Optional[int] = 1,
            max_per_page: Optional[int] = 50,
    ):
        """ Implements Pagination to fetch cached articles """
        # convert language, country to match stored data
        is_language = pycountry.languages.get(alpha_2=language.lower())
        final_language = "english" if not is_language else is_language.name.lower()

        final_country = ""
        if country != ["wo"]:
            is_country = pycountry.countries.get(alpha_2 = country.upper())
            final_country = is_country.name.lower()
        else:
            final_country = "world"

        offset = (page - 1) * max_per_page
        query = f"@language:{final_language}"
        
        query_str = Query(query).paging(offset=offset, num=max_per_page)

        results = await asyncio.to_thread(self.ft.search,query_str)
        return [self._from_redis_safe(article.__dict__) for article in results.docs
                if final_country in article.__dict__["country"] and category in article.__dict__["category"]
                ]
    
redis_handler = RedisHandler()