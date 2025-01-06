from pydantic import BaseModel


class CategoryRecipeResponse(BaseModel):
    recipe_id: int
    category_id: int

    class Config:
        from_attributes = True
