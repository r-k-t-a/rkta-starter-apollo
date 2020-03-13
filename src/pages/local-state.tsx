import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Link from 'next/link';

import Button from 'blocks/Button';
import homePath from 'path/homePath';
import { Errors, LOCAL_ERRORS, PUSH_LOCAL_ERROR, PURGE_LOCAL_ERRORS } from 'apollo/schema';

const variables = {
  name: 'Custom error',
  message: 'Ups, it happend',
};

const Error = (): React.ReactNode => {
  const { data } = useQuery<Errors>(LOCAL_ERRORS, { ssr: false });
  const [pushError] = useMutation(PUSH_LOCAL_ERROR);
  const [purgeErrors] = useMutation(PURGE_LOCAL_ERRORS);
  return (
    <>
      &larr;&nbsp;
      <Link href={homePath()}>
        <a>Home</a>
      </Link>
      {data?.errors.map(({ id, message, name }) => (
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
