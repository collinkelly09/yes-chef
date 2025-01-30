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
    allow_origins=["http://10.0.2.2:19000"],
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
