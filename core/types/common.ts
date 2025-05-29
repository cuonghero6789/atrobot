// Base types
export interface BaseModel {
    id: string;
    created_at: string;
    updated_at: string;
  }
  
  // Generic API types
  export interface ApiResponse<T> {
    data: T;
    error?: string;
    message?: string;
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
  }
  
  // Generic Location type
  export interface Location {
    name: string;
    lat: number;
    lng: number;
  }
  
  // Generic Message type
  export interface MessageModel {
    id: string;
    user_id: string;
    content: string;
    format: string;
    created_time: string;
    updated_time: string;
    chat_id?: string;
  }
  
  // User related types
  export interface UserModel {
    id?: string;
    user_name?: string;
    display_name?: string;
    birthday?: string;
    gender?: string;
    language_code?: string;
    ai_language?: string;
    timezone?: string;
    hometown?: Location | string;
    relationships?: string;
    avatar?: string;
    email?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: UserModel;
    created: string;
  }
  
  export interface ChatModel {
    id: string;
    mode: string;
  }

  // Response types
  export interface LoginResponse {
    id: string;
    token: string;
    user: UserModel;
    created: string;
  }

  export interface UpdateAccountResponse {
    success: boolean;
    message?: string;
  }