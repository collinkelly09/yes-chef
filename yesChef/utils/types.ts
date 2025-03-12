import { z } from "zod";
import {
  categorySchema,
  ingredientSchema,
  recipeSchema,
  stepSchema,
} from "./validationSchema";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Auth Types
export interface SignUpRequest {
  name: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
  username: string;
}

// Recipe Types
export type RecipeRequest = z.infer<typeof recipeSchema>;

export interface RecipeResponse {
  id: number;
  name: string;
  rating: number;
  photo_url: string;
  time: string;
  created_at: string;
  user_id: number;
  ingredients: IngredientResponse[];
  steps: StepResponse[];
}

export interface RecipeListResponse {
  id: number;
  name: string;
  rating: number;
  photo_url?: string;
  time: string;
  created_at: string;
  user_id: number;
}

export interface RecipeResponseList {
  recipes: RecipeListResponse[];
}

// Ingredient Types
export type IngredientRequest = z.infer<typeof ingredientSchema>;

export interface IngredientResponse {
  id: number;
  name: string;
  quantity: string;
  recipe_id: number;
}

// Step Types
export type StepRequest = z.infer<typeof stepSchema>;

export interface StepResponse {
  id: number;
  name: string;
  step_number: number;
  recipe_id: number;
}

// Category Types
export type CategoryRequest = z.infer<typeof categorySchema>;

export interface CategoryResponse {
  id: number;
  name: string;
  recipes?: RecipeResponseList;
}

export interface CategoryResponseList {
  categories: CategoryResponse[];
}

//* Other Types

export interface ErrorResponse {
  data: {
    detail: string;
  };
  status: number;
}

// Root Stack Param
export type RootStackParamList = {
  Home: undefined;
  Signin: undefined;
  Signup: undefined;
  Recipes: undefined;
  Recipe: { recipeId: number };
  Categories: undefined;
  Category: { categoryId: number };
};

// Root Drawer Param
export type RootDrawerParamList = {
  HomeStack: undefined;
  RecipeStack: undefined;
  CategoryStack: undefined;
};

// Navigation Prop Types

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type RecipesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Recipes"
>;
