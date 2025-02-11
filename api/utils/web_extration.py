import requests
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session

# from ..db.models import User, Recipe, Ingredient, Step, Category, engine


def extract_recipe_data():
    response = requests.get(
        "https://cooked.wiki/new/recent/d6c28656-4678-4771-a044-52e6cac10bb5"
    )
    soup = BeautifulSoup(response.text, "html.parser")

    ingredient_elements = soup.select('[class="ingredient"]')
    ingredients = [
        element.get_text(strip=True) for element in ingredient_elements
    ]

    print(ingredients)


extract_recipe_data()
