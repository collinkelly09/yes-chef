"""
Entry point for the FastAPI Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authlib.integrations.starlette_client import OAuth, OAuthError
from starlette.middleware.sessions import SessionMiddleware
from fastapi.templating import Jinja2Templates
from starlette.requests import Request
from starlette.responses import RedirectResponse

# from fastapi import Request
from utils.config import CLIENT_ID, CLIENT_SECRET, SECRET_KEY
from fastapi.staticfiles import StaticFiles


# from routers import (
#     auth_router,
#     ingredient_router,
#     category_router,
#     recipe_router,
#     step_router,
#     recipe_to_category_router,
# )
import os

app = FastAPI()


app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY,
    # CORSMiddleware,
    # allow_origins=[
    #     os.environ.get("CORS_HOST", "http://localhost:5173"),
    #     "http://localhost:19006",
    #     "http://10.0.2.2:19006",
    # ],
    # allow_credentials=True,
    # allow_methods=["*"],
    # allow_headers=["*"],
)
app.mount("/api/static", StaticFiles(directory="static"), name="static")

oauth = OAuth()
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    client_kwargs={
        "scope": "openid email profile",
        "redirect_url": "http://localhost:8000/auth",
    },
)

# app.include_router(auth_router.router)
# app.include_router(recipe_router.router, tags=["Recipes"])
# app.include_router(ingredient_router.router, tags=["Ingredients"])
# app.include_router(step_router.router, tags=["Steps"])
# app.include_router(category_router.router, tags=["Categories"])
# app.include_router(recipe_to_category_router.router, tags=["Categories"])

templates = Jinja2Templates(directory="templates")


@app.get("/")
def index(request: Request):
    user = request.session.get("user")
    if user:
        return RedirectResponse("welcome")
    return templates.TemplateResponse(
        name="home.html", context={"request": request}
    )


@app.get("/welcome")
async def welcome(request: Request):
    user = request.session.get("user")
    if not user:
        return RedirectResponse("/")
    return templates.TemplateResponse(
        name="welcome.html", context={"request": request, "user": user}
    )


@app.get("/login")
async def login(request: Request):
    uri = request.url_for("auth")
    return await oauth.google.authorize_redirect(request, uri)


@app.get("/auth")
async def auth(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as e:
        return templates.TemplateResponse(
            name="error.html", context={"request": request, "error": e.error}
        )
    user = token.get("userinfo")
    if user:
        print(dict(user))
        request.session["user"] = dict(user)
    return RedirectResponse("welcome")


@app.get("/logout")
def logout(request: Request):
    request.session.pop("user")
    return RedirectResponse("/")
