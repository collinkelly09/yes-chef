from pydantic import BaseModel
from typing import List


class IngredientRequest(BaseModel):
    """
    Represents the parameters needed to create a new ingredient
    """

    ingredient: str
    quantity: str


class IngredientResponse(BaseModel):
    """
    Represents an ingredient
    """

    id: int
    ingredient: str
    quantity: str
    recipe_id: int

    class Config:
        from_attributes = True


class IngredientList(BaseModel):
    """
    Represents a list of ingredients
    """

    ingredients: List[IngredientResponse]
