from schema.recipes import RecipeListResponse, RecipeResponse, RecipeList
from schema.category_recipe import CategoryRecipeResponse
from db.models import Category, Recipe, RecipeCategory, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, update, select


class RecipeToCategoryQueries:

    def is_in_category(self, recipe_id, category_id) -> bool:
        with Session(engine) as session:
            stmt = select(RecipeCategory).where(
                RecipeCategory.recipe_id == recipe_id,
                RecipeCategory.category_id == category_id,
            )
            result = session.execute(stmt).scalars().first()

            return result is not None

    def add_to_category(
        self, recipe_id, category_id
    ) -> CategoryRecipeResponse:
        with Session(engine) as session:

            row = RecipeCategory(recipe_id=recipe_id, category_id=category_id)
            session.add(row)
            session.commit()
            if not row:
                return None
            return CategoryRecipeResponse.model_validate(row)

    def get_category_recipes(
        self, category_id: int, user_id: int
    ) -> RecipeList:
        with Session(engine) as session:
            stmt = (
                (
                    select(Recipe)
                    .join(
                        RecipeCategory, Recipe.id == RecipeCategory.recipe_id
                    )
                    .join(Category, Category.id == RecipeCategory.category_id)
                )
                .filter(
                    Category.id == category_id,
                    Category.user_id == user_id,
                    Recipe.user_id == user_id,
                )
                .order_by(Recipe.created_at.desc())
            )

            recipes = session.execute(stmt).scalars().all()

            converted_recipes = [
                RecipeListResponse.model_validate(recipe) for recipe in recipes
            ]
            return {"recipes": converted_recipes}

    def remove_recipe(self, category_id: int, recipe_id: int) -> bool:
        with Session(engine) as session:
            stmt = delete(RecipeCategory).where(
                RecipeCategory.category_id == category_id,
                RecipeCategory.recipe_id == recipe_id,
            )

            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0
