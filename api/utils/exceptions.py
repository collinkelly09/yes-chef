from fastapi import HTTPException


class UserDatabaseException(Exception):
    pass


class UserException(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="User must be signed in")


class ExistingUserException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=401, detail="Account exists with this email"
        )


class InvalidCredentialsException(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="Invalid credentials")


class RecipeNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Recipe not found")


class RecipeNotCreatedException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Could not create recipe")


class CategoryNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Category not found")


class IngredientNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Ingredient not found")


class StepNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Step not found")


class AlreadyInCategoryException(HTTPException):
    def __init__(self):
        super().__init__(status_code=409, detail="Already in Category")


class NotInCategoryException(HTTPException):
    def __init__(self):
        super().__init__(status_code=404, detail="Not in Category")


class InvalidRatingException(HTTPException):
    def __init__(self):
        super().__init__(status_code=400, detail="Invalid rating")
