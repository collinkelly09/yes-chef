# from schema.users import UserResponse
# from schema.category_recipe import (
#     CatRecManyToManyOut,
# )
# from schema.recipes import RecipeList
# from queries.recipe_queries import RecipeQueries
# from queries.recipe_category_queries import RecipeToCategoryQueries
# from queries.category_queries import CategoryQueries
# from utils.authentication import try_get_jwt_user_data
# from fastapi import APIRouter, Depends
# from utils.exceptions import (
#     RecipeNotFoundException,
#     UserException,
#     CategoryNotFoundException,
#     AlreadyInCategoryException,
#     NotInCategoryException,
# )

# router = APIRouter()


# @router.post(
#     "/categories/{category_id}/recipes/",
#     response_model=CatRecManyToManyOut,
# )
# def add_recipe_to_category(
#     recipe_id: int,
#     category_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     category_queries: CategoryQueries = Depends(),
#     recipe_to_category_queries: RecipeToCategoryQueries = Depends(),
# ):
#     """
#     Add a recipe to a category.

#     Parameters:
#     - recipe_id (int): The ID of the recipe to add to the category.
#     - category_id (int): The ID of the category to add the recipe to.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object for interacting
#         with the recipe data. Defaults to an instance of RecipeQueries.
#     - category_queries (CategoryQueries): The queries object for interacting
#         with the category data. Defaults to an instance of CategoryQueries.
#     - recipe_to_category_queries (RecipeToCategoryQueries): The queries object
#         for interacting with the recipe-to-category data. Defaults to an
#         instance of RecipeToCategoryQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.
#     - CategoryNotFoundException: If the category is not found.
#     - AlreadyInCategoryException: If the recipe is already in the category.

#     Returns:
#     - The relationship between the recipe and the category.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     category = category_queries.get_category(
#         category_id=category_id, user_id=user.id
#     )
#     if category is None:
#         raise CategoryNotFoundException
#     in_category = recipe_to_category_queries.is_in_category(
#         recipe_id=recipe_id, category_id=category_id
#     )
#     if in_category:
#         raise AlreadyInCategoryException
#     return recipe_to_category_queries.add_to_category(
#         recipe_id=recipe_id, category_id=category_id, user_id=user.id
#     )


# @router.get("/categories/{category_id}/recipes/", response_model=RecipeList)
# def get_category_recipes(
#     category_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     category_queries: CategoryQueries = Depends(),
#     recipe_to_category_queries: RecipeToCategoryQueries = Depends(),
# ):
#     """
#     Retrieves recipes in a given category.

#     Parameters:
#     - category_id (int): The ID of the category to retrieve recipes for.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - category_queries (CategoryQueries):  The queries object
#         for interacting with the category data. Defaults to an
#         instance of CategoryQueries.
#     - recipe_to_category_queries (RecipeToCategoryQueries): The queries object
#         for interacting with the recipe-to-categories data. Defaults to an
#         instance of RecipeToCategoryQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - CategoryNotFoundException: If the category is not found.

#     Returns:
#     - RecipeList[RecipeOut]: The list of recipes in the category.
#     """
#     if user is None:
#         raise UserException
#     category = category_queries.get_category(
#         category_id=category_id, user_id=user.id
#     )
#     if category is None:
#         raise CategoryNotFoundException
#     return recipe_to_category_queries.get_category_recipes(
#         category_id=category_id, user_id=user.id
#     )


# @router.delete(
#     "/categories/{category_id}/recipes/{recipe_id}", status_code=204
# )
# def remove_recipe_from_category(
#     category_id: int,
#     recipe_id: int,
#     user: UserResponse = Depends(try_get_jwt_user_data),
#     recipe_queries: RecipeQueries = Depends(),
#     category_queries: CategoryQueries = Depends(),
#     recipe_to_category_queries: RecipeToCategoryQueries = Depends(),
# ):
#     """
#     Removes a recipe from a category.

#     Parameters:
#     - category_id (int): The ID of the category to remove the recipe from.
#     - recipe_id (int): The ID of the recipe to remove from the category.
#     - user (UserResponse): The user making the request. Defaults to the
#         result of the try_get_jwt_user_data function.
#     - recipe_queries (RecipeQueries): The queries object for interacting
#         with the recipe data. Defaults to an instance of RecipeQueries.
#     - category_queries (CategoryQueries): The queries object for interacting
#         with the category data. Defaults to an instance of CategoryQueries.
#     - recipe_to_category_queries (RecipeToCategoryQueries): The queries object
#         for interacting with the recipe-to-category data. Defaults to an
#         instance of RecipeToCategoryQueries.

#     Raises:
#     - UserException: If the user is not authenticated.
#     - RecipeNotFoundException: If the recipe is not found.
#     - CategoryNotFoundException: If the category is not found.
#     - NotInCategoryException: If the recipe is not in the category.

#     Returns:
#     - 204 No Content: If the recipe is successfully removed from the category.
#     """
#     if user is None:
#         raise UserException
#     recipe = recipe_queries.get_recipe(recipe_id=recipe_id, user_id=user.id)
#     if recipe is None:
#         raise RecipeNotFoundException
#     category = category_queries.get_category(
#         category_id=category_id, user_id=user.id
#     )
#     if category is None:
#         raise CategoryNotFoundException
#     in_category = recipe_to_category_queries.is_in_category(
#         recipe_id=recipe_id, category_id=category_id
#     )
#     if not in_category:
#         raise NotInCategoryException
#     recipe_to_category_queries.remove_recipe(
#         category_id=category_id, recipe_id=recipe_id, user_id=user.id
#     )
