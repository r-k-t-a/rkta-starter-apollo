import gql from 'graphql-tag';

export const clientContext = gql`
  query ClientContext {
    clientContext @client {
      language
      country
      statusCode
    }
  }
`;

export const localErrors = gql`
  query LocalErrors {
    errors @client {
      id
      message
      name
      statusCode
    }
  }
`;
