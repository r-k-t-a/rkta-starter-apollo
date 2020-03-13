import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Errors, LOCAL_ERRORS } from 'apollo/schema';
import Card from './Card';

const ApolloError = (): JSX.Element => {
  const { data } = useQuery<Errors>(LOCAL_ERRORS, { ssr: false });
  return <>{data && data.errors.slice(0, 1).map(error => <Card key={error.id} {...error} />)}</>;
};

export default ApolloError;
