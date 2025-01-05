import os
from dotenv import load_dotenv


load_dotenv()

# Base URL
BASE_URL = os.getenv("BASE_URL")

# Database Variables
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_DB_NAME = os.getenv("POSTGRES_DB_NAME", "postgres")

DATABASE_URL = f"postgresql+psycopg2://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB_NAME}"

# OAuth Variables
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", None)
GOOGLE_SECRET_KEY = os.getenv("GOOGLE_SECRET_KEY", None)
GOOGLE_REDIRECT_URI = f"{BASE_URL}/auth"
