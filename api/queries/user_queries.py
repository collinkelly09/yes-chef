"""
Database Queries for Users
"""

import os
from sqlalchemy.orm import Session
from db.models import User, engine
from typing import Optional
from schema.users import UserWithPw
from utils.exceptions import UserDatabaseException
from utils.config import DATABASE_URL

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with Session(engine) as session:
                user = (
                    session.query(User)
                    .where(User.username == username)
                    .first()
                )
                if not user:
                    return None
                converted_user = UserWithPw.model_validate(user)
        except Exception as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return converted_user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with Session(engine) as session:
                user = session.query(User).where(User.id == id).first()
                if not user:
                    return None
                converted_user = UserWithPw.model_validate(user)
        except Exception as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return converted_user

    def create_user(
        self, name: str, username: str, hashed_password: str
    ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with Session(engine) as session:
                user = User(
                    name=name,
                    username=username,
                    hashed_password=hashed_password,
                )
                session.add(user)
                session.commit()
                if not user:
                    raise UserDatabaseException(
                        f"Could not create user with username {username}"
                    )
                converted_user = UserWithPw.model_validate(user)
        except Exception as e:
            print(e)
            raise UserDatabaseException(
                f"Could not create user with username {username}"
            )
        return converted_user
