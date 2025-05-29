import { gql } from '@apollo/client';

// AI Language mutations
export const UPDATE_AI_LANGUAGE = gql`
  mutation UpdateAILanguage($ai_language: String!) {
    updateAccount(input: {ai_language: $ai_language})
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language_code: String!, $ai_language: String!) {
    updateAccount(input: {language_code: $language_code, ai_language: $ai_language})
  }
`;

// Astrology mutations
export const ASTROME = gql`
  mutation AstroMe($planet: String!, $sign: String!) {
    astroMe(input: {planet: $planet, sign: $sign})
  }
`;

export const ASTROME_GEN_QUESTION = gql`
  mutation AstroGenQuestion($topic: AstroTopic!) {
    astroGenQuestion(input: {topic: $topic})
  }
`;

export const ASTROME_ANSWER_QUESTION = gql`
  mutation AstroAnswerQuestion($topic: AstroTopic!, $question: String!) {
    astroAnswerQuestion(input: {topic: $topic, question: $question})
  }
`;

export const ASTROME_DAILY = gql`
  mutation AstroDaily($from_date: String!) {
    astroDaily(input: {from_date: $from_date})
  }
`;

export const ASTROME_MONTHLY = gql`
  mutation AstroMonthly($from_date: String!) {
    astroMonthly(input: {from_date: $from_date})
  }
`;

export const ASTROME_QUOTE = gql`
  mutation AstroQuote($from_date: String!) {
    astroQuote(input: {from_date: $from_date})
  }
`;

export const ASTRO_BOT = gql`
  mutation AstroBot($user_input: String!, $chat_id: String!) {
    astroBot(input: {user_input: $user_input, chat_id: $chat_id})
  }
`;

export const ASTROME_DOMINANT = gql`
  mutation AstroMeDominant {
    astroMeDominant
  }
`;

export const ASTROME_MANIFEST = gql`
  mutation AstroMeManifest {
    astroMeManifest
  }
`; 