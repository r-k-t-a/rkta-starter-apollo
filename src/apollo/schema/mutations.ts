import gql from 'graphql-tag';

export const POP_LOCAL_ERROR = gql`
  mutation popLocalError {
    popLocalError @client
  }
`;

export const PURGE_LOCAL_ERRORS = gql`
  mutation PurgeLocalErrors {
    purgeLocalErrors @client
  }
`;

export const PUSH_LOCAL_ERROR = gql`
  mutation pushLocalError($message: String!, $name: String!, $statusCode: Int!) {
    pushLocalError(message: $message, name: $name, statusCode: $statusCode) @client {
      message
      name
      statusCode
    }
  }
`;

export const SET_LANGUAGE = gql`
  mutation SetLanguage($language: String!) {
    setLanguage(language: $language) @client {
      language
      country
      statusCode
    }
  }
`;
