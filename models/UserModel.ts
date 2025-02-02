export interface LocationModel {
  name: string;
  lat: number;
  lng: number;
}
export interface UserModel {
  id?: string;
  user_name?: string;
  display_name?: string;
  birthday?: string;
  relationships?: string;
  avatar?: string;
  email?: string;
  hometown?: LocationModel;
  gender?: string;
  language_code?: string;
  ai_language?: string;
  timezone?: string;
}

export interface MessageModel {
  id: string;
  user_id?: string;
  content: string;
  format?: string;
  created_time?: string;
  updated_time?: string;
  chat_id?: string;
}

export interface ChatModel {
  id?: string;
  mode?: string;
}
