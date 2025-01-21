"""
Entry point for the FastAPI Application
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    auth_router,
    ingredient_router,
    category_router,
    recipe_router,
    step_router,
    recipe_category_router,
)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "*"
        # os.environ.get("CORS_HOST", "http://localhost:5173"),
        "http://127.0.0.1:19000",
        "http://172.22.128.1:19000",
        "http://127.0.0.1:19006",
        "http://172.22.128.1:19006",
        "http://10.0.2.2:19000",
        "http://10.0.2.2:19006",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(recipe_router.router)
app.include_router(ingredient_router.router)
app.include_router(step_router.router)
app.include_router(category_router.router)
app.include_router(recipe_category_router.router)
