import requests
from bs4 import BeautifulSoup

# from sqlalchemy.orm import Session
# from ..db.models import User, Recipe, Ingredient, Step, Category, engine


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


def extract_recipe_data():
    url = "https://cookieandkate.com/thai-red-curry-recipe/"

    # Send a GET request with headers
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an error for bad status codes

    # Parse the HTML content
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract ingredients
    ingredient_elements = soup.select('[class*="ingredient"]')
    ingredients = [
        element.get_text(strip=True) for element in ingredient_elements
    ]

    print(ingredients)


extract_recipe_data()
