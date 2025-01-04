"""
Pydantic Models for Users.
"""

from pydantic import BaseModel
from api.schema.categories import CategoryResponse
from api.schema.recipes import RecipeResponse


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    name: str
    email: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    name: str
    categories: list
    recipes: list

    class Config:
        from_attributes = True

    @classmethod
    def model_validate(cls, obj):
        # Override the model_validate method to properly serialize the categories
        user_dict = super().model_validate(obj).model_dump()
        # Manually serialize the categories
        user_dict["categories"] = [
            CategoryResponse.model_validate(category)
            for category in obj.categories
        ]

        user_dict["recipes"] = [
            RecipeResponse.model_validate(recipe) for recipe in obj.recipes
        ]
        return cls(**user_dict)


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    name: str
    email: str
    password: str
