import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Page404, UnknownError } from 'blocks/Error';
import { CLIENT_CONTEXT } from 'apollo/schema';

interface ClientContext {
  clientContext: { statusCode: number };
}

const ErrorPage = (): JSX.Element => {
  const { cache } = useApolloClient();
  const { statusCode } = cache.readQuery<ClientContext>({ query: CLIENT_CONTEXT }, true)
    ?.clientContext || {
    statusCode: 500,
  };
  return statusCode === 404 ? <Page404 /> : <UnknownError statusCode={statusCode} />;
};

export default ErrorPage;
