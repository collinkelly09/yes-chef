from datetime import datetime
from sqlalchemy.orm import Session
from db.models import User, Category, engine
from schema.categories import CategoryResponse
from schema.users import UserResponse


with Session(engine) as session:
    u = User(name="collin", email="gfd@gmail.com", hashed_password="fgdfj")
    # c = Category(name="one", user_id=1)
    session.add(u)
    # session.add_all([u, c])
    session.commit()

    # cat = session.query(Category).where(Category.id == 1).first()
    # new = CategoryResponse.model_validate(cat)
    # user = session.query(User).where(User.id == 1).first()
    # new = UserResponse.model_validate(user)
    # print(user)
    # print(new)
