import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Errors, localErrors } from 'apollo/schema';
import Card from './Card';

const ApolloError = (): JSX.Element => {
  const { data } = useQuery<Errors>(localErrors, { ssr: false });
  return <>{data && data.errors.slice(0, 1).map(error => <Card key={error.id} {...error} />)}</>;
};

export default ApolloError;
