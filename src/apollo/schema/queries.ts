import gql from 'graphql-tag';

export const CLIENT_CONTEXT = gql`
  query ClientContext {
    clientContext @client {
      language
      country
      statusCode
    }
  }
`;

export const LOCAL_ERRORS = gql`
  query LocalErrors {
    errors @client {
      id
      message
      name
      statusCode
    }
  }
`;
