import { z } from "zod";
import {
  categorySchema,
  ingredientSchema,
  recipeSchema,
  stepSchema,
} from "./validationSchema";

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
  photo_url: string;
  created_at: string;
  user_id: number;
  ingredients: IngredientResponse[];
  steps: StepResponse[];
}

export interface RecipeListResponse {
  recipes: {
    id: number;
    name: string;
    photo_url?: string;
    created_at: string;
    user_id: number;
  };
}
[];

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
  recipes?: RecipeListResponse;
}

export interface CategoryListResponse {
  id: number;
  name: string;
}

//* Other Types

// Error
export interface ErrorResponse {
  detail: string;
}

// Root Stack Param
export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
};
