# from schema.recipes import RecipeResponse, RecipeList
# # from schema.category_recipe import (
# #     CatRecManyToManyOut,
# )


# class RecipeToCategoryQueries:
#     def is_in_category(self, recipe_id, category_id) -> bool:
#         with pool.connection() as conn:
#             with conn.cursor(
#                 row_factory=class_row(CatRecManyToManyOut)
#             ) as cur:
#                 cur.execute(
#                     """
#                     SELECT *
#                     FROM recipe_to_categories
#                     WHERE recipe_id = %s AND category_id = %s
#                     """,
#                     [recipe_id, category_id],
#                 )
#                 return cur.rowcount > 0

#     def add_to_category(
#         self, recipe_id, category_id, user_id
#     ) -> CatRecManyToManyOut:
#         with pool.connection() as conn:
#             with conn.cursor(
#                 row_factory=class_row(CatRecManyToManyOut)
#             ) as cur:
#                 cur.execute(
#                     """
#                     INSERT INTO recipe_to_categories (
#                         user_id,
#                         recipe_id,
#                         category_id
#                     )
#                     VALUES (
#                         %s, %s, %s
#                     )
#                     RETURNING *;
#                     """,
#                     [user_id, recipe_id, category_id],
#                 )
#                 return cur.fetchone()

#     def get_category_recipes(
#         self, category_id: int, user_id: int
#     ) -> RecipeList:
#         with pool.connection() as conn:
#             with conn.cursor(row_factory=class_row(RecipeOut)) as cur:
#                 cur.execute(
#                     """
#                     SELECT r.*
#                     FROM recipes AS r
#                     JOIN recipe_to_categories AS rtc ON r.id = rtc.recipe_id
#                     JOIN categories AS c ON rtc.category_id = c.id
#                     WHERE c.id = %s
#                         AND c.user_id = %s
#                         AND r.user_id = %s
#                         AND rtc.user_id = %s
#                     ORDER BY r.created_at DESC;
#                     """,
#                     [category_id, user_id, user_id, user_id],
#                 )
#                 return RecipeList(recipes=cur.fetchall())

#     def remove_recipe(
#         self, category_id: int, recipe_id: int, user_id: int
#     ) -> bool:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM recipe_to_categories
#                     WHERE category_id = %s
#                         AND recipe_id = %s
#                         AND user_id = %s
#                     """,
#                     [category_id, recipe_id, user_id],
#                 )
#                 return cur.rowcount > 0
