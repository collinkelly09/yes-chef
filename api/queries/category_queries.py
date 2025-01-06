from schema.categories import (
    CategoryRequest,
    CategoryResponse,
    CategoryList,
)
from db.models import Category, engine
from sqlalchemy.orm import Session
from sqlalchemy import delete, update


class CategoryQueries:
    def create_category(
        self, category_in: CategoryRequest, user_id: int
    ) -> CategoryResponse:
        with Session(engine) as session:
            category = Category(name=category_in.name, user_id=user_id)
            session.add(category)
            session.commit()
            if not category:
                return None
            return CategoryResponse.model_validate(category)

    def get_categories(self, user_id: int) -> CategoryList:
        with Session(engine) as session:
            categories = (
                session.query(Category)
                .where(Category.user_id == user_id)
                .all()
            )
            converted_categories = [
                CategoryResponse.model_validate(category)
                for category in categories
            ]

            return {"categories": converted_categories}

    def get_category(self, category_id: int, user_id: int) -> CategoryResponse:
        with Session(engine) as session:
            recipe = (
                session.query(Category)
                .where(Category.id == category_id, Category.user_id == user_id)
                .first()
            )
            if recipe is None:
                return None

            return CategoryResponse.model_validate(recipe)

    def update_category(
        self, category_id: int, category_in: CategoryRequest, user_id: int
    ) -> bool:

        with Session(engine) as session:
            stmt = (
                update(Category)
                .where(Category.id == category_id, Category.user_id == user_id)
                .values(name=category_in.name)
            )
            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0

    def delete_category(self, category_id: int, user_id: int) -> bool:
        with Session(engine) as session:

            stmt = delete(Category).where(
                Category.id == category_id, Category.user_id == user_id
            )
            result = session.execute(stmt)
            session.commit()

            return result.rowcount > 0
