from pydantic import BaseModel
from typing import List

from .recipes import RecipeResponse


class CategoryRequest(BaseModel):
    name: str


class CategoryResponse(BaseModel):
    id: int
    name: str
    recipes: list

    class Config:
        from_attributes = True

    @classmethod
    def model_validate(cls, obj):
        category_dict = super().model_validate(obj).model_dump()

        category_dict["recipes"] = [
            RecipeResponse.model_validate(recipe) for recipe in obj.recipes
        ]

        return cls(**category_dict)


class CategoryList(BaseModel):
    categories: List[CategoryResponse]
