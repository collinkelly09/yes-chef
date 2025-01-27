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
export interface RecipeRequest {
  name: string;
  photo_url: string;
}

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
export interface IngredientRequest {
  name: string;
  quantity: string;
}

export interface IngredientResponse {
  id: number;
  name: string;
  quantity: string;
  recipe_id: number;
}

// Step Types
export interface StepResponse {
  id: number;
  name: string;
  step_number: number;
  recipe_id: number;
}

// Error
export interface ErrorResponse {
  detail: string;
}

//* Root Stack Param Type

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
};
