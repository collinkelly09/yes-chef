from queries.recipe_queries import RecipeQueries
from schema.users import UserResponse
from queries.step_queries import StepQueries
from schema.steps import StepRequest, StepResponse, StepList
from utils.authentication import try_get_jwt_user_data
from fastapi import APIRouter, Depends
from utils.exceptions import (
    RecipeNotFoundException,
    UserException,
    StepNotFoundException,
)

router = APIRouter(tags=["Steps"], prefix="/api")


@router.post("/recipes/{recipe_id}/steps", response_model=StepResponse)
def create_step(
    step_in: StepRequest,
    recipe_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    step_queries: StepQueries = Depends(),
):
    """
    Create a new step for a recipe.

    Parameters:
    - step_in (StepRequest): The input data for the step.
    - recipe_id (int): The ID of the recipe to add the step to.
    - user (UserResponse): The user making the request. Defaults
        to the result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object for interacting
        with the recipe data. Defaults to an instance of RecipeQueries.
    - step_queries (StepQueries): The queries object for interacting
        with the step data. Defaults to an instance of StepQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.

    Returns:
    - The created step.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    step = step_queries.create_step(step_in=step_in, recipe_id=recipe_id)
    return step


# @router.get("/recipes/{recipe_id}/steps", response_model=StepList)
# def get_steps(
#     recipe_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     step_queries: StepQueries = Depends(),
# ):
#     """
#     Retrieves steps for a given recipe.

#     Parameters:
#     - recipe_id (int): The ID of the recipe to retrieve steps for.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object used to retrieve the
#         recipe. Defaults to an instance of RecipeQueries.
#     - step_queries (StepQueries): The queries object used to retrieve the
#     steps. Defaults to an instance of StepQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.

#     Returns:
#     - List[StepResponse]: A list of steps for the recipe.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     return step_queries.get_steps(recipe_id=recipe_id)


# @router.get(
#     "/recipes/{recipe_id}/steps/{step_id}", response_model=StepResponse
# )
# def get_step_details(
#     recipe_id: int,
#     step_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     step_queries: StepQueries = Depends(),
# ):
#     """
#     Retrieves the details of a step.

#     Parameters:
#     - recipe_id (int): The ID of the recipe the step belongs to.
#     - step_id (int): The ID of the step to retrieve.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object used to retrieve the
#         recipe. Defaults to an instance of RecipeQueries.
#     - step_queries (StepQueries): The queries object used to retrieve the step.
#         Defaults to an instance of StepQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.
#     - StepNotFoundException: If the step is not found.

#     Returns:
#     - StepResponse: The details of the step.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     step = step_queries.get_step(recipe_id=recipe_id, step_id=step_id)
#     if step is None:
#         raise StepNotFoundException
#     return step


@router.patch("/recipes/{recipe_id}/steps/{step_id}", status_code=204)
def update_step(
    step_in: StepRequest,
    recipe_id: int,
    step_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    step_queries: StepQueries = Depends(),
):
    """
    Update a step for a recipe.

    Parameters:
    - step_in (StepRequest): The input data for the step.
    - recipe_id (int): The ID of the recipe the step belongs to.
    - step_id (int): The ID of the step to update.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object for interacting with
        the recipe data. Defaults to an instance of RecipeQueries.
    - step_queries (StepQueries): The queries object for interacting with the
        step data. Defaults to an instance of StepQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.
    - StepNotFoundException: If the step is not found.

    Returns:
    - The updated step.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    updated = step_queries.update_step(
        step_in=step_in, recipe_id=recipe_id, step_id=step_id
    )
    if not updated:
        raise StepNotFoundException


@router.delete("/recipes/{recipe_id}/steps/{step_id}", status_code=204)
def delete_step(
    recipe_id: int,
    step_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    recipe_queries: RecipeQueries = Depends(),
    step_queries: StepQueries = Depends(),
):
    """
    Delete a step from a recipe.

    Parameters:
    - recipe_id (int): The ID of the recipe the step belongs to.
    - step_id (int): The ID of the step to delete.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - recipe_queries (RecipeQueries): The queries object for interacting with
        the recipe data. Defaults to an instance of RecipeQueries.
    - step_queries (StepQueries): The queries object for interacting with the
        step data. Defaults to an instance of StepQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - RecipeNotFoundException: If the recipe is not found.
    - StepNotFoundException: If the step is not found.

    Returns:
    - 204 No Content. If the step is successfully deleted.
    """
    if user is None:
        raise UserException
    recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
    if recipe is None:
        raise RecipeNotFoundException
    deleted = step_queries.delete_step(recipe_id=recipe_id, step_id=step_id)
    if deleted is False:
        raise StepNotFoundException
