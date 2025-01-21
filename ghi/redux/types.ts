export interface UserResponse {
  id: number;
  name: string;
  username: string;
}

export interface UserRequest {
  name: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ErrorResponse {
  detail: string;
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
