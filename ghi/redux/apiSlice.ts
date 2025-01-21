import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  UserResponse,
  UserRequest,
  LoginRequest,
  ErrorResponse,
  RecipeListResponse,
} from "./types";

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
    listAllRecipes: builder.query<RecipeListResponse, void>({
      query: () => ({
        url: "/api/recipes",
      }),
      providesTags: [{ type: "Recipes", id: "ALL" }],
    }),
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
    signup: builder.mutation<UserResponse | ErrorResponse, UserRequest>({
      query: (body) => ({
        url: "api/auth/signup",
        body,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: "api/auth/signout",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useListAllRecipesQuery,
} = recipeApi;
