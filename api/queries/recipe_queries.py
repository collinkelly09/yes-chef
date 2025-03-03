"""
Database Queries for Recipes
"""

from utils.exceptions import RecipeNotCreatedException
from schema.recipes import (
    RecipeListResponse,
    RecipeRequest,
    RecipeResponse,
    RecipeList,
)
from db.models import Recipe, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, update


class RecipeQueries:

    def create_recipe(
        self, recipe_in: RecipeRequest, user_id: int
    ) -> RecipeResponse:
        with Session(engine) as session:
            recipe = Recipe(
                name=recipe_in.name,
                photo_url=recipe_in.photo_url,
                rating=recipe_in.rating,
                user_id=user_id,
                time=recipe_in.time,
            )
            session.add(recipe)
            session.commit()
            if not recipe:
                raise RecipeNotCreatedException

            converted_recipe = RecipeResponse.model_validate(recipe)
            return converted_recipe

    def get_recipes(self, user_id: int) -> RecipeList:
        with Session(engine) as session:
            recipes = (
                session.query(Recipe).where(Recipe.user_id == user_id).all()
            )
            converted = [
                RecipeListResponse.model_validate(recipe) for recipe in recipes
            ]

            return {"recipes": converted}

    def get_recipe(self, recipe_id: int, user_id: int) -> RecipeResponse:
        with Session(engine) as session:
            recipe = (
                session.query(Recipe)
                .where(Recipe.id == recipe_id, Recipe.user_id == user_id)
                .first()
            )
            if recipe is None:
                return None

            return RecipeResponse.model_validate(recipe)

    def update_recipe(
        self, recipe_id: int, recipe_in: RecipeRequest, user_id: int
    ) -> bool:

        with Session(engine) as session:
            stmt = (
                update(Recipe)
                .where(Recipe.id == recipe_id, Recipe.user_id == user_id)
                .values(
                    name=recipe_in.name,
                    photo_url=recipe_in.photo_url,
                    rating=recipe_in.rating,
                    time=recipe_in.time,
                )
            )
            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0

    def delete_recipe(self, recipe_id: int, user_id: int) -> bool:

        with Session(engine) as session:

            stmt = delete(Recipe).where(
                Recipe.id == recipe_id, Recipe.user_id == user_id
            )
            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0
