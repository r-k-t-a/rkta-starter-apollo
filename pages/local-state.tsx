import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Link from 'next/link';

import SELECT_ERRORS from 'apollo/query/localErrors.graphql';
import PUSH_ERROR from 'apollo/mutation/pushLocalError.graphql';
import PURGE_ERRORS from 'apollo/mutation/purgeLocalErrors.graphql';

import Button from 'blocks/Button';
import homePath from 'path/homePath';
import { Errors } from 'apollo/resolve/pushLocalError';

const variables = {
  name: 'Custom error',
  message: 'Ups, it happend',
};

const Error = (): React.ReactNode => {
  const { data } = useQuery<Errors>(SELECT_ERRORS, { ssr: false });
  const [pushError] = useMutation(PUSH_ERROR);
  const [purgeErrors] = useMutation(PURGE_ERRORS);
  return (
    <>
      &larr;&nbsp;
      <Link href={homePath()}>
        <a>Home</a>
      </Link>
      {data &&
        data.errors.map(({ id, message, name }) => (
          <div key={id}>
            <h6>{name}</h6>
            <div>{message}</div>
          </div>
        ))}
      <hr />
      <Button
        onClick={(): void => {
          pushError({ variables });
        }}
      >
        Add Error
      </Button>
      {data && data.errors.length > 0 && (
        <Button
          onClick={(): void => {
            purgeErrors();
          }}
        >
          Purge Errors
        </Button>
      )}
    </>
  );
};

export default Error;
