import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login(
    $token: String!
    $device_id: String!
    $device_name: String!
    $app_version: String!
  ) {
    login(
      input: {
        token: $token
        device_id: $device_id
        device_name: $device_name
        app_version: $app_version
      }
    ) {
      id
      token
      user {
        id
        user_name
        display_name
      }
      created
    }
  }
`;

const UPDATE_ACCOUNT_INFO = gql`
  mutation UpdateAccountInfo(
    $display_name: String!
    $relationships: String!
    $birthday: String!
    $hometown: String!
    $gender: String!
    $timezone: String!
  ) {
    updateAccount(
      inputHometown: {name: $hometown, lat: 0, lng: 0}
      input: {
        display_name: $display_name
        relationships: $relationships
        birthday: $birthday
        gender: $gender
        timezone: $timezone
      }
    )
  }
`;

const UPDATE_APP_LANGUAGE = gql`
  mutation UpdateAPPLanguage($language_code: String!) {
    updateAccount(input: {language_code: $language_code})
  }
`;

const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language_code: String!, $ai_language: String!) {
    updateAccount(input: {language_code: $language_code, ai_language: $ai_language})
  }
`;

const UPDATE_AI_LANGUAGE = gql`
  mutation UpdateAILanguage($ai_language: String!) {
    updateAccount(input: {ai_language: $ai_language})
  }
`;

const UPDATE_TIME_ZONE = gql`
  mutation UpdateTimeZone($timezone: String!) {
    updateAccount(input: {timezone: $timezone})
  }
`;

const LOGOUT = gql`
  mutation Logout($device_id: String!) {
    logout(input: {device_id: $device_id})
  }
`;

const ASTROME = gql`
  mutation AstroMe($planet: String!, $sign: String!) {
    astroMe(input: {planet: $planet, sign: $sign})
  }
`;

const ASTROME_GEN_QUESTION = gql`
  mutation AstroGenQuestion($topic: AstroTopic!) {
    astroGenQuestion(input: {topic: $topic})
  }
`;

const ASTROME_ANSWER_QUESTION = gql`
  mutation AstroAnswerQuestion($topic: AstroTopic!, $question: String!) {
    astroAnswerQuestion(input: {topic: $topic, question: $question})
  }
`;

const ASTROME_DAILY = gql`
  mutation AstroDaily($from_date: String!) {
    astroDaily(input: {from_date: $from_date})
  }
`;

const ASTROME_QUOTE = gql`
  mutation AstroQuote($from_date: String!) {
    astroQuote(input: {from_date: $from_date})
  }
`;
const UPLOAD_AVATAR = gql`
  mutation UpdateAvatar($file: Upload!, $base64: String!) {
    updateAvatar(input: {avatar: $file, avatar_base64: $base64})
  }
`;

const UPDATE_LOCATION_INFO = gql`
  mutation UpdateLocationInfo($lat: Float!, $lng: Float!) {
    updateAccount(inputCurrentCity: {name: "", lat: $lat, lng: $lng})
  }
`;

const ASTRO_BOT = gql`
  mutation AstroBot($user_input: String!, $chat_id: String!) {
    astroBot(input: {user_input: $user_input, chat_id: $chat_id})
  }
`;
const ASTROME_DOMINANT = gql`
  mutation AstroMeDominant {
    astroMeDominant
  }
`;
export {
  LOGIN,
  UPDATE_ACCOUNT_INFO,
  LOGOUT,
  UPDATE_AI_LANGUAGE,
  UPDATE_APP_LANGUAGE,
  ASTROME,
  ASTROME_GEN_QUESTION,
  ASTROME_ANSWER_QUESTION,
  ASTROME_DAILY,
  ASTROME_QUOTE,
  UPLOAD_AVATAR,
  UPDATE_LOCATION_INFO,
  ASTRO_BOT,
  UPDATE_TIME_ZONE,
  ASTROME_DOMINANT,
  UPDATE_LANGUAGE,
};
