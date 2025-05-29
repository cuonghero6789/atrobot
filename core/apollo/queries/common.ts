import { gql } from '@apollo/client';

// User profile queries
export const ACCOUNT = gql`
  query {
    account {
      id
      user_name
      display_name
      birthday
      gender
      language_code
      ai_language
      timezone
      hometown {
        name
        lat
        lng
      }
      relationships
      avatar
      email
    }
  }
`;

// Chat queries
export const CHATS = gql`
  query {
    chats {
      id
      mode
    }
  }
`;

export const MESSAGES = gql`
  query Messages($chat_id: String!, $page: Int!) {
    messages(input: {chat_id: $chat_id, page: $page}) {
      id
      user_id
      content
      format
      create_time
      update_time
    }
  }
`; 