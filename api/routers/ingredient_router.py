from schema.users import UserResponse
from schema.ingredients import (
    IngredientRequest,
    IngredientResponse,
    IngredientList,
)
from queries.recipe_queries import RecipeQueries
from queries.ingredient_queries import IngredientQueries
from utils.authentication import try_get_jwt_user_data
from fastapi import APIRouter, Depends
from utils.exceptions import (
    RecipeNotFoundException,
    UserException,
    IngredientNotFoundException,
)

router = APIRouter(tags=["Ingredients"], prefix="/api")


@router.post(
    "/recipes/{recipe_id}/ingredients", response_model=IngredientResponse
)
def create_ingredient(
    ingredient_in: IngredientRequest,
    recipe_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    ingredient_queries: IngredientQueries = Depends(),
):
    """
    Create a new ingredient for a recipe.

    Parameters:
    - ingredient_in (IngredientRequest): The input data for the ingredient.
    - recipe_id (int): The ID of the recipe to add the ingredient to.
    - user (UserResponse): The user making the request. Defaults
        to the result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object for interacting
        with the recipe data. Defaults to an instance of RecipeQueries.
    - ingredient_queries (IngredientQueries): The queries object for
         interacting with the ingredient data. Defaults to an instance
         of IngredientQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.

    Returns:
    - The created ingredient.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    ingredient = ingredient_queries.create_ingredient(
        ingredient_in=ingredient_in, recipe_id=recipe.id
    )
    return ingredient


# @router.get("/recipes/{recipe_id}/ingredients", response_model=IngredientList)
# def get_ingredients(
#     recipe_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     ingredient_queries: IngredientQueries = Depends(),
# ):
#     """
#     Retrieves ingredients for a given recipe.

#     Parameters:
#     - recipe_id (int): The ID of the recipe to retrieve ingredients for.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object used to retrieve the
#         recipe. Defaults to an instance of RecipeQueries.
#     - ingredient_queries (IngredientQueries): The queries object used to
#         retrieve the ingredients. Defaults to an instance of IngredientQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.

#     Returns:
#     - List[IngredientResponse]: A list of ingredients for the recipe.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     return ingredient_queries.get_ingredients(recipe_id=recipe.id)


# @router.get(
#     "/recipes/{recipe_id}/ingredients/{ingredient_id}",
#     response_model=IngredientResponse,
# )
# def get_ingredient_details(
#     recipe_id: int,
#     ingredient_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     ingredient_queries: IngredientQueries = Depends(),
# ):
#     """
#     Retrieves details for a specific ingredient.

#     Parameters:
#     - recipe_id (int): The ID of the recipe the ingredient belongs to.
#     - ingredient_id (int): The ID of the ingredient to retrieve.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object used to retrieve the
#         recipe. Defaults to an instance of RecipeQueries.
#     - ingredient_queries (IngredientQueries): The queries object used to
#     retrieve the ingredient. Defaults to an instance of IngredientQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.
#     - IngredientNotFoundException: If the ingredient is not found.

#     Returns:
#     - IngredientResponse: The details of the ingredient.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     ingredient = ingredient_queries.get_ingredient(
#         ingredient_id=ingredient_id, recipe_id=recipe_id
#     )
#     if ingredient is None:
#         raise IngredientNotFoundException
#     return ingredient


@router.patch(
    "/recipes/{recipe_id}/ingredients/{ingredient_id}", status_code=204
)
def update_ingredient(
    ingredient_in: IngredientRequest,
    recipe_id: int,
    ingredient_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    ingredient_queries: IngredientQueries = Depends(),
):
    """
    Update an ingredient for a recipe.

    Parameters:
    - ingredient_in (IngredientRequest): The input data for the ingredient.
    - recipe_id (int): The ID of the recipe the ingredient belongs to.
    - ingredient_id (int): The ID of the ingredient to update.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object used to retrieve the
        recipe. Defaults to an instance of RecipeQueries.
    - ingredient_queries (IngredientQueries): The queries object used to
        update the ingredient. Defaults to an instance of IngredientQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.
    - IngredientNotFoundException: If the ingredient is not found.

    Returns:
    - IngredientResponse: The updated ingredient.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    updated = ingredient_queries.update_ingredient(
        ingredient_in=ingredient_in,
        recipe_id=recipe_id,
        ingredient_id=ingredient_id,
    )
    if not updated:
        raise IngredientNotFoundException


@router.delete(
    "/recipes/{recipe_id}/ingredients/{ingredient_id}", status_code=204
)
def delete_ingredient(
    recipe_id: int,
    ingredient_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    ingredient_queries: IngredientQueries = Depends(),
):
    """
    Delete an ingredient from a recipe.

    Parameters:
    - recipe_id (int): The ID of the recipe the ingredient belongs to.
    - ingredient_id (int): The ID of the ingredient to delete.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object used to retrieve the
        recipe. Defaults to an instance of RecipeQueries.
    - ingredient_queries (IngredientQueries): The queries object used to
        delete the ingredient. Defaults to an instance of IngredientQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.
    - IngredientNotFoundException: If the ingredient is not found.

    Returns:
    - 204 No Content: If the ingredient is successfully deleted.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    deleted = ingredient_queries.delete_ingredient(
        recipe_id=recipe_id, ingredient_id=ingredient_id
    )
    if deleted is False:
        raise IngredientNotFoundException
