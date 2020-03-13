import gql from 'graphql-tag';

export const popLocalError = gql`
  mutation popLocalError {
    popLocalError @client
  }
`;

export const purgeLocalErrors = gql`
  mutation PurgeLocalErrors {
    purgeLocalErrors @client
  }
`;

export const pushLocalError = gql`
  mutation pushLocalError($message: String!, $name: String!, $statusCode: Int!) {
    pushLocalError(message: $message, name: $name, statusCode: $statusCode) @client {
      message
      name
      statusCode
    }
  }
`;

export const setLanguage = gql`
  mutation SetLanguage($language: String!) {
    setLanguage(language: $language) @client {
      language
      country
      statusCode
    }
  }
`;
