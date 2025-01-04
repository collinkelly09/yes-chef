import os
from dotenv import load_dotenv


load_dotenv()

# Database Variables
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_DB_NAME = os.getenv("POSTGRES_DB_NAME", "postgres")

# OAuth Variables
CLIENT_ID = os.getenv("CLIENT_ID", None)
CLIENT_SECRET = os.getenv("CLIENT_SECRET", None)
SECRET_KEY = os.getenv("SECRET_KEY", None)
