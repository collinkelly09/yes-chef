"""
Database Queries for Ingredients
"""

from schema.ingredients import (
    IngredientRequest,
    IngredientResponse,
    IngredientList,
)
from db.models import Ingredient, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, update


class IngredientQueries:
    def create_ingredient(
        self, ingredient_in: IngredientRequest, recipe_id: int
    ) -> IngredientResponse:
        with Session(engine) as session:
            ingredient = Ingredient(
                name=ingredient_in.name,
                quantity=ingredient_in.quantity,
                recipe_id=recipe_id,
            )
            session.add(ingredient)
            session.commit()
            if not ingredient:
                return None
            converted_ingredient = IngredientResponse.model_validate(
                ingredient
            )

            return converted_ingredient

    def update_ingredient(
        self,
        ingredient_in: IngredientRequest,
        recipe_id: int,
        ingredient_id: int,
    ) -> bool:
        with Session(engine) as session:
            stmt = (
                update(Ingredient)
                .where(
                    Ingredient.id == ingredient_id,
                    Ingredient.recipe_id == recipe_id,
                )
                .values(
                    name=ingredient_in.name, quantity=ingredient_in.quantity
                )
            )
            result = session.execute(stmt)
            session.commit()
            return result.rowcount == 1

    def delete_ingredient(self, recipe_id: int, ingredient_id: int) -> bool:
        with Session(engine) as session:
            stmt = delete(Ingredient).where(
                Ingredient.id == ingredient_id,
                Ingredient.recipe_id == recipe_id,
            )
            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0
