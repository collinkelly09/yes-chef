from pydantic import BaseModel
from typing import List
from datetime import datetime
from .ingredients import IngredientResponse
from .steps import StepResponse


class RecipeRequest(BaseModel):
    """
    Represents the parameters needed to create a new recipe
    """

    name: str
    photo_url: str
    rating: int


class RecipeResponse(BaseModel):
    """
    Represents a recipe
    """

    id: int
    name: str
    photo_url: str
    created_at: datetime
    user_id: int
    ingredients: List[IngredientResponse]
    steps: List[StepResponse]

    class Config:
        from_attributes = True

    @classmethod
    def model_validate(cls, obj):
        recipe_dict = super().model_validate(obj).model_dump()

        recipe_dict["ingredients"] = [
            IngredientResponse.model_validate(ingredient)
            for ingredient in obj.ingredients
        ]

        recipe_dict["steps"] = [
            StepResponse.model_validate(step) for step in obj.steps
        ]

        return cls(**recipe_dict)


class RecipeListResponse(BaseModel):
    """
    Represents a recipe
    """

    id: int
    name: str
    photo_url: str
    rating: int
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True


class RecipeList(BaseModel):
    """
    Represents a list of recipes
    """

    recipes: List[RecipeListResponse]
