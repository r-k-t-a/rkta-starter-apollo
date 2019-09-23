import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import SELECT_ERRORS from '../../../../apollo/query/localErrors.graphql';
import { Errors } from '../../../../apollo/resolve/pushLocalError';

import Card from './Card';

const ApolloError = (): JSX.Element => {
  const { data } = useQuery<Errors>(SELECT_ERRORS, { ssr: false });
  return <>{data && data.errors.slice(0, 1).map(error => <Card key={error.id} {...error} />)}</>;
};

export default ApolloError;
