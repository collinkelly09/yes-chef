import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  UserResponse,
  SignUpRequest,
  LoginRequest,
  ErrorResponse,
  RecipeListResponse,
  RecipeResponse,
  RecipeRequest,
  IngredientResponse,
  IngredientRequest,
  StepResponse,
  StepRequest,
  CategoryResponse,
  CategoryRequest,
  CategoryResponseList,
} from "../utils/types";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!EXPO_PUBLIC_API_URL) {
  throw new Error("EXPO_PUBLIC_API_URL is not defined");
}

export const recipeApi = createApi({
  tagTypes: ["User", "Recipes", "Categories"],
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: EXPO_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Auth Queries and Mutations
    getUser: builder.query<UserResponse | null, void>({
      query: () => ({
        url: "/api/auth/authenticate",
      }),
      providesTags: ["User"],
    }),

    signin: builder.mutation<UserResponse | ErrorResponse, LoginRequest>({
      query: (body) => ({
        url: "api/auth/signin",
        body,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<UserResponse | ErrorResponse, SignUpRequest>({
      query: (body) => ({
        url: "api/auth/signup",
        body,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    signout: builder.mutation<null | ErrorResponse, void>({
      query: () => ({
        url: "api/auth/signout",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Recipe Queries and Mutations
    getRecipeDetails: builder.query<
      RecipeResponse | ErrorResponse,
      { recipeId: number }
    >({
      query: ({ recipeId }) => ({
        url: `/api/recipes/${recipeId}`,
      }),
      providesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    listRecipes: builder.query<RecipeListResponse | ErrorResponse, void>({
      query: () => ({
        url: "/api/recipes",
      }),
      providesTags: [{ type: "Recipes", id: "ALL" }],
    }),

    createRecipe: builder.mutation<
      RecipeResponse | ErrorResponse,
      RecipeRequest
    >({
      query: (body) => ({
        url: "/api/recipes",
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ALL" }],
    }),

    updateRecipe: builder.mutation<
      null | ErrorResponse,
      { recipeId: number; body: RecipeRequest }
    >({
      query: ({ recipeId, body }) => ({
        url: `api/recipes/${recipeId}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Recipes", id: "ONE" },
        { type: "Recipes", id: "ALL" },
        { type: "Categories", id: "ONE" },
      ],
    }),

    deleteRecipe: builder.mutation<null | ErrorResponse, { recipeId: number }>({
      query: ({ recipeId }) => ({
        url: `/api/recipes/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Recipes", id: "ALL" },
        { type: "Categories", id: "ONE" },
      ],
    }),

    // Ingredient Mutations
    createIngredient: builder.mutation<
      IngredientResponse | ErrorResponse,
      { recipeId: number; body: IngredientRequest }
    >({
      query: ({ recipeId, body }) => ({
        url: `/api/recipes/${recipeId}/ingredients`,
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    updateIngredient: builder.mutation<
      null | ErrorResponse,
      { recipeId: number; ingredientId: number; body: IngredientRequest }
    >({
      query: ({ recipeId, ingredientId, body }) => ({
        url: `/api/recipes/${recipeId}/ingredients/${ingredientId}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    deleteIngredient: builder.mutation<
      null | ErrorResponse,
      { recipeId: number; ingredientId: number }
    >({
      query: ({ recipeId, ingredientId }) => ({
        url: `/api/recipes/${recipeId}/ingredients/${ingredientId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    // Step Mutations
    createStep: builder.mutation<
      StepResponse,
      { recipeId: number; body: StepRequest }
    >({
      query: ({ recipeId, body }) => ({
        url: `/api/recipes/${recipeId}/steps`,
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    updateStep: builder.mutation<
      null | ErrorResponse,
      { recipeId: number; stepId: number; body: StepRequest }
    >({
      query: ({ recipeId, stepId, body }) => ({
        url: `/api/recipes/${recipeId}/steps/${stepId}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    deleteStep: builder.mutation<
      null | ErrorResponse,
      { recipeId: number; stepId: number }
    >({
      query: ({ recipeId, stepId }) => ({
        url: `/api/recipes/${recipeId}/steps/${stepId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    // Category Queries and Mutations
    listCategories: builder.query<CategoryResponseList | ErrorResponse, void>({
      query: () => ({
        url: "/api/categories",
      }),
      providesTags: [{ type: "Categories", id: "ALL" }],
    }),

    getCategoryDetails: builder.query<
      CategoryResponse | ErrorResponse,
      { categoryId: number }
    >({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
      }),
      providesTags: [{ type: "Categories", id: "ONE" }],
    }),

    createCategory: builder.mutation<
      CategoryResponse | ErrorResponse,
      CategoryRequest
    >({
      query: (body) => ({
        url: "/api/categories",
        body,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "ALL" }],
    }),

    updateCategory: builder.mutation<
      null | ErrorResponse,
      { categoryId: number; body: CategoryRequest }
    >({
      query: ({ categoryId, body }) => ({
        url: `/api/categories/${categoryId}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: [
        { type: "Categories", id: "ONE" },
        { type: "Categories", id: "ALL" },
      ],
    }),

    deleteCategory: builder.mutation<
      null | ErrorResponse,
      { categoryId: number }
    >({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "ALL" }],
    }),

    addRecipeToCategory: builder.mutation<
      null | ErrorResponse,
      { categoryId: number; recipeId: number }
    >({
      query: ({ categoryId, recipeId }) => ({
        url: `/api/categories/${categoryId}/recipes/${recipeId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "ONE" }],
    }),

    removeRecipeFromCategory: builder.mutation<
      null | ErrorResponse,
      { categoryId: number; recipeId: number }
    >({
      query: ({ categoryId, recipeId }) => ({
        url: `/api/categories/${categoryId}/recipes/${recipeId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "ONE" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useCreateRecipeMutation,
  useGetRecipeDetailsQuery,
  useListRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useCreateStepMutation,
  useUpdateStepMutation,
  useDeleteStepMutation,
  useListCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddRecipeToCategoryMutation,
} = recipeApi;
