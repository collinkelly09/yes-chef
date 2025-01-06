from schema.users import UserResponse
from schema.recipes import RecipeRequest, RecipeResponse, RecipeList
from queries.recipe_queries import RecipeQueries
from utils.authentication import try_get_jwt_user_data
from fastapi import APIRouter, Depends
from utils.exceptions import (
    RecipeNotFoundException,
    UserException,
    InvalidRatingException,
)

router = APIRouter(tags=["Recipes"], prefix="/api")


@router.post("/recipes", response_model=RecipeResponse)
def create_recipe(
    recipe_in: RecipeRequest,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: RecipeQueries = Depends(),
):
    """
    Create a new recipe.

    Parameters:
    - recipe_in (RecipeRequest): The input data for the recipe.
    - user (UserResponse): The user making the request. Defaults
        to the result of the try_get_jwt_user_data function.
    - queries (RecipeQueries): The queries object for interacting
        with the recipe data. Defaults to an instance of RecipeQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - InvalidRatingException: If the rating is not between 1 and 5.

    Returns:
    - The created recipe.
    """
    if user is None:
        raise UserException
    recipe = queries.create_recipe(recipe_in, user_id=user.id)
    return recipe


@router.get("/recipes", response_model=RecipeList)
def get_recipes(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: RecipeQueries = Depends(),
):
    """
    Retrieves recipes for a given user.

    Parameters:
    - user (UserResponse): The user making the request.
    - queries (RecipeQueries): The queries object used to retrieve recipes.
        Defaults to an instance of RecipeQueries.

    Raises:
    - UserException: If the user is not authenticated.

    Returns:
    - List[RecipeResponse]: A list of recipes for the user.
    """

    if user is None:
        raise UserException
    recipes = queries.get_recipes(user_id=user.id)
    return recipes


@router.get("/recipes/{recipe_id}", response_model=RecipeResponse)
def get_recipe_details(
    recipe_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: RecipeQueries = Depends(),
):
    """
    Retrieves the details of a recipe.

    Parameters:
    - recipe_id (int): The ID of the recipe to retrieve.
    - user (UserResponse, optional): The user making the request.
        Defaults to the result of the try_get_jwt_user_data function.
    - queries (RecipeQueries, optional): The instance of RecipeQueries used
        to query the database. Defaults to a new instance of RecipeQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe with the given ID is not found.

    Returns:
    - The details of the recipe.

    """

    if user is None:
        raise UserException
    recipe = queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    return recipe


@router.patch("/recipes/{recipe_id}", status_code=204)
def update_recipe(
    recipe_id: int,
    recipe_in: RecipeRequest,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: RecipeQueries = Depends(),
):
    """
    Update a recipe with the given recipe_id.

    Parameters:
    - recipe_id (int): The ID of the recipe to be updated.
    - recipe_in (RecipeRequest): The updated recipe data.
    - user (UserResponse, optional): The user making the request. Defaults
         to the result of try_get_jwt_user_data.
    - queries (RecipeQueries, optional): The instance of RecipeQueries class.
         Defaults to an instance of RecipeQueries.

    Raises:
    - UserException: If the user is None.
    - RecipeNotFoundException: If the recipe with the given recipe_id is not
         found.
    - InvalidRatingException: If the rating is not between 1 and 5.

    Returns:
    - Updated recipe data.
    """

    if user is None:
        raise UserException
    updated = queries.update_recipe(
        recipe_id=recipe_id, recipe_in=recipe_in, user_id=user.id
    )
    if not updated:
        raise RecipeNotFoundException


@router.delete("/recipes/{recipe_id}", status_code=204)
def delete_recipe(
    recipe_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: RecipeQueries = Depends(),
):
    """
    Delete a recipe with the given recipe_id.

    Parameters:
    - recipe_id (int): The ID of the recipe to be deleted.
    - user (UserResponse, optional): The user making the request. Defaults
         to the result of try_get_jwt_user_data.
    - queries (RecipeQueries, optional): The instance of RecipeQueries class.
            Defaults to an instance of RecipeQueries.

    Raises:
    - UserException: If the user is None.
    - RecipeNotFoundException: If the recipe with the given recipe_id is not
         found.

    Returns:
    - 204 No Content. If the recipe is successfully deleted.
    """
    if user is None:
        raise UserException
    recipe = queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    return queries.delete_recipe(recipe_id=recipe_id, user_id=user.id)
