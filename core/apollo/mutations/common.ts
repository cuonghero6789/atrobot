import { gql } from '@apollo/client';

// Authentication mutations
export const LOGIN = gql`
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

export const LOGOUT = gql`
  mutation Logout($device_id: String!) {
    logout(input: {device_id: $device_id})
  }
`;

// User profile mutations
export const UPDATE_ACCOUNT_INFO = gql`
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

export const UPDATE_APP_LANGUAGE = gql`
  mutation UpdateAPPLanguage($language_code: String!) {
    updateAccount(input: {language_code: $language_code})
  }
`;

export const UPDATE_TIME_ZONE = gql`
  mutation UpdateTimeZone($timezone: String!) {
    updateAccount(input: {timezone: $timezone})
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation UpdateAvatar($file: Upload!, $base64: String!) {
    updateAvatar(input: {avatar: $file, avatar_base64: $base64})
  }
`;

export const UPDATE_LOCATION_INFO = gql`
  mutation UpdateLocationInfo($lat: Float!, $lng: Float!) {
    updateAccount(inputCurrentCity: {name: "", lat: $lat, lng: $lng})
  }
`; 