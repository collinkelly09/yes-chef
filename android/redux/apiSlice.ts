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
} from "../utils/types";

const EXPO_PUBLIC_API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!EXPO_PUBLIC_API_URL) {
  throw new Error("EXPO_PUBLIC_API_URL is not defined");
}

export const recipeApi = createApi({
  tagTypes: ["User", "Recipes"],
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: EXPO_PUBLIC_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
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

    getRecipeDetails: builder.query<
      RecipeResponse | ErrorResponse,
      { recipeId: number }
    >({
      query: ({ recipeId }) => ({
        url: `/api/recipes/${recipeId}`,
      }),
      providesTags: [{ type: "Recipes", id: "ONE" }],
    }),

    listAllRecipes: builder.query<RecipeListResponse | ErrorResponse, void>({
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
      invalidatesTags: [
        { type: "Recipes", id: "ONE" },
        { type: "Recipes", id: "ALL" },
        { type: "Recipes", id: "CATEGORY" },
      ],
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
        { type: "Recipes", id: "CATEGORY" },
      ],
    }),

    deleteRecipe: builder.mutation<null | ErrorResponse, { recipeId: number }>({
      query: ({ recipeId }) => ({
        url: `/api/recipes/${recipeId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Recipes", id: "ONE" },
        { type: "Recipes", id: "ALL" },
        { type: "Recipes", id: "CATEGORY" },
      ],
    }),

    createIngredient: builder.mutation<
      IngredientResponse | ErrorResponse,
      { recipeId: number; body: IngredientRequest }
    >({
      query: ({ recipeId, body }) => ({
        url: `/recipes/${recipeId}/ingredients`,
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
        url: `/recipes/${recipeId}/ingredients/${ingredientId}`,
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
        url: `/recipes/${recipeId}/ingredients/${ingredientId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Recipes", id: "ONE" }],
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
  useListAllRecipesQuery,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useCreateIngredientMutation,
} = recipeApi;
