from sqlalchemy import (
    PrimaryKeyConstraint,
    create_engine,
    ForeignKey,
    Text,
    TIMESTAMP,
    CheckConstraint,
)
from utils.config import DATABASE_URL
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship
from sqlalchemy.sql import func
from typing import Optional
from db.db_types import str_100, str_256


# add echo=True to echo the generated SQL
engine = create_engine(DATABASE_URL)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    username: Mapped[str_100] = mapped_column()
    hashed_password: Mapped[str_256] = mapped_column()


class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str_256] = mapped_column()
    photo_url: Mapped[Optional[str]] = mapped_column(Text)
    rating: Mapped[Optional[int]] = mapped_column(
        CheckConstraint("rating BETWEEN 1 AND 5", name="check_rating_range")
    )
    created_at: Mapped[str] = mapped_column(
        TIMESTAMP, default=func.current_timestamp(), nullable=False
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )
    ingredients: Mapped[list["Ingredient"]] = relationship()
    steps: Mapped[list["Step"]] = relationship()
    categories: Mapped[list["Category"]] = relationship(
        secondary="recipe_category", back_populates="recipes"
    )


class Ingredient(Base):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str_256] = mapped_column()
    quantity: Mapped[Optional[str_256]] = mapped_column()
    recipe_id: Mapped[int] = mapped_column(
        ForeignKey("recipes.id", ondelete="CASCADE")
    )
    recipe: Mapped["Recipe"] = relationship(back_populates="ingredients")


class Step(Base):
    __tablename__ = "steps"

    id: Mapped[int] = mapped_column(primary_key=True)
    step_number: Mapped[int] = mapped_column()
    name: Mapped[str] = mapped_column(Text)
    recipe_id: Mapped[int] = mapped_column(
        ForeignKey("recipes.id", ondelete="CASCADE")
    )
    recipe: Mapped["Recipe"] = relationship(back_populates="steps")


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str_100] = mapped_column()
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )
    recipes: Mapped[list["Recipe"]] = relationship(
        secondary="recipe_category", back_populates="categories"
    )


class RecipeCategory(Base):
    __tablename__ = "recipe_category"

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id", ondelete="CASCADE")
    )
    recipe_id: Mapped[int] = mapped_column(
        ForeignKey("recipes.id", ondelete="CASCADE")
    )

    __table_args__ = (PrimaryKeyConstraint("category_id", "recipe_id"),)


Base.metadata.create_all(engine)
