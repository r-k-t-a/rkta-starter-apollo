import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Page404, UnknownError } from 'blocks/Error';
import query from '../apollo/query/clientContext.graphql';

interface ClientContext {
  clientContext: { statusCode: number };
}

const ErrorPage = (): JSX.Element => {
  const { cache } = useApolloClient();
  const { statusCode } = cache.readQuery<ClientContext>({ query }, true)?.clientContext || {
    statusCode: 500,
  };
  return statusCode === 404 ? <Page404 /> : <UnknownError statusCode={statusCode} />;
};

export default ErrorPage;
