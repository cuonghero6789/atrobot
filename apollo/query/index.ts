import { gql } from '@apollo/client';

const GET_SUBJECT = gql`
  query {
    get_subject {
      planets {
        name
        sign
        sign_name
        house
        name_label
        sign_label
      }
      houses {
        name
        sign
        name_label
      }
      elements {
        name
        name_label
      }
      qualities {
        name
        name_label
      }
      element_distributions {
        percent
        name
        name_label
      }
      quality_distributions {
        percent
        name
        name_label
      }
    }
  }
`;

const ACCOUNT = gql`
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

const CHATS = gql`
  query {
    chats {
      id
      mode
    }
  }
`;

const MESSAGES = gql`
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

export { GET_SUBJECT, ACCOUNT, CHATS, MESSAGES };
