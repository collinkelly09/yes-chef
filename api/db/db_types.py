from sqlalchemy import String
from sqlalchemy.orm import mapped_column
from typing_extensions import Annotated

str_100 = Annotated[str, mapped_column(String(100))]
str_256 = Annotated[str, mapped_column(String(256))]
