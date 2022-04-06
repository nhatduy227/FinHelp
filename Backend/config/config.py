import os
from dotenv import load_dotenv

load_dotenv("config/.env")


class Config:
    finhub_api_domain = os.getenv("FINHUB_API_DOMAIN")
    finhub_api_key = os.getenv("FINHUB_API_KEY")
