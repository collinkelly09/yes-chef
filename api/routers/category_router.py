from schema.users import UserResponse
from schema.categories import CategoryRequest, CategoryResponse, CategoryList
from queries.category_queries import CategoryQueries
from utils.authentication import try_get_jwt_user_data
from fastapi import APIRouter, Depends
from utils.exceptions import (
    CategoryNotFoundException,
    UserException,
)

router = APIRouter(tags=["Categories"], prefix="/api")


@router.post("/categories", response_model=CategoryResponse)
def create_category(
    category_in: CategoryRequest,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CategoryQueries = Depends(),
):
    """
    Create a new category.

    Parameters:
    - category_in (CategoryRequest): The input data for the category.
    - user (UserResponse): The user making the request. Defaults
        to the result of the try_get_jwt_user_data function.
    - queries (CategoryQueries): The queries object for interacting
        with the category data. Defaults to an instance of CategoryQueries.

    Raises:
    - UserException: If the user is not authenticated.

    Returns:
    - CategoryResponse: The created category.
    """
    if user is None:
        raise UserException
    category = queries.create_category(
        category_in=category_in, user_id=user.id
    )
    return category


@router.get("/categories", response_model=CategoryList)
def get_categories(
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CategoryQueries = Depends(),
):
    """
    Retrieves categories for a given user.

    Parameters:
    - user (UserResponse): The user making the request.
    - queries (CategoryQueries): The queries object used to retrieve
        categories. Defaults to an instance of CategoryQueries.

    Raises:
    - UserException: If the user is not authenticated.

    Returns:
    - CategoryList: The list of categories.
    """
    if user is None:
        raise UserException
    categories = queries.get_categories(user_id=user.id)
    return categories


@router.get("/categories/{category_id}", response_model=CategoryResponse)
def get_category_details(
    category_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CategoryQueries = Depends(),
):
    """
    Retrieves details for a specific category.

    Parameters:
    - category_id (int): The ID of the category to retrieve.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - queries (CategoryQueries): The queries object for interacting with the
        category data. Defaults to an instance of CategoryQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - CategoryNotFoundException: If the category is not found.

    Returns:
    - CategoryResponse: The category details.
    """
    if user is None:
        raise UserException
    category = queries.get_category(category_id=category_id, user_id=user.id)
    if category is None:
        raise CategoryNotFoundException
    return category


@router.patch("/categories/{category_id}", status_code=204)
def update_category(
    category_id: int,
    category_in: CategoryRequest,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CategoryQueries = Depends(),
):
    """
    Update a category.

    Parameters:
    - category_id (int): The ID of the category to update.
    - category_in (CategoryRequest): The input data for the category.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - queries (CategoryQueries): The queries object for interacting with the
        category data. Defaults to an instance of CategoryQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - CategoryNotFoundException: If the category is not found.

    Returns:
    - CategoryResponse: The updated category.
    """
    if user is None:
        raise UserException
    updated = queries.update_category(
        category_id=category_id,
        category_in=category_in,
        user_id=user.id,
    )
    if updated is None:
        raise CategoryNotFoundException


@router.delete("/categories/{category_id}", status_code=204)
def delete_category(
    category_id: int,
    user: UserResponse = Depends(try_get_jwt_user_data),
    queries: CategoryQueries = Depends(),
):
    """
    Delete a category.

    Parameters:
    - category_id (int): The ID of the category to delete.
    - user (UserResponse): The user making the request. Defaults to the
        result of the try_get_jwt_user_data function.
    - queries (CategoryQueries): The queries object for interacting with the
        category data. Defaults to an instance of CategoryQueries.

    Raises:
    - UserException: If the user is not authenticated.
    - CategoryNotFoundException: If the category is not found.

    Returns:
    - 204 No Content. If the category is successfully deleted.
    """
    if user is None:
        raise UserException
    category = queries.get_category(category_id=category_id, user_id=user.id)
    if category is None:
        raise CategoryNotFoundException
    queries.delete_category(category_id=category_id, user_id=user.id)
