from dotenv import load_dotenv
import os

load_dotenv()

class EnvVariables:
    news_data_api = os.getenv("NEWSDATA_API_KEY")
    redis_host = os.getenv("REDIS_HOST")
    redis_port = os.getenv("REDIS_PORT")

env_variables = EnvVariables()