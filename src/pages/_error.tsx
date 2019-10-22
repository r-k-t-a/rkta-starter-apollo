import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import get from 'lodash/get';

import { Error404, UnknownError } from '../blocks/Error';

const ErrorPage: React.FunctionComponent = () => {
  const { cache } = useApolloClient();
  const statusCode = get(cache, 'data.data.statusCode');
  return statusCode === 404 ? <Error404 /> : <UnknownError statusCode={statusCode} />;
};

export default ErrorPage;
