import React from 'react';
import { Query, Mutation } from 'react-apollo';
import Link from 'next/link';

import SELECT_ERRORS from '../apollo/query/localErrors.graphql';
import PUSH_ERROR from '../apollo/mutation/pushLocalError.graphql';
import PURGE_ERRORS from '../apollo/mutation/purgeLocalErrors.graphql';
import RESET_ERROR from '../apollo/mutation/resetLocalError.graphql';

import Button from '../src/blocks/Button';
import homePath from '../src/path/homePath';

const variables = {
  name: 'Custom error',
  message: 'Ups, it happend',
};

const Error = (): React.ReactNode => (
  <Query query={SELECT_ERRORS} ssr={false}>
    {({ data: { errors = [] } }): React.ReactNode => (
      <>
        &larr;&nbsp;
        <Link href={homePath()}>
          <a>Home</a>
        </Link>
        {errors.map(({ id, message, name }) => (
          <div key={id}>
            <h6>{name}</h6>
            <div>{message}</div>
            <Mutation mutation={RESET_ERROR}>
              {(resetError): React.ReactNode => (
                <Button onClick={(): React.ReactNode => resetError({ variables: { id } })}>
                  &times;
                </Button>
              )}
            </Mutation>
          </div>
        ))}
        <hr />
        <Mutation mutation={PUSH_ERROR}>
          {(pushError): React.ReactNode => (
            <Button
              onClick={(): void => {
                pushError({ variables });
              }}
            >
              Add Error
            </Button>
          )}
        </Mutation>
        {errors.length > 0 && (
          <Mutation mutation={PURGE_ERRORS}>
            {(purgeErrors): React.ReactNode => (
              <Button
                onClick={(): void => {
                  purgeErrors();
                }}
              >
                Purge Errors
              </Button>
            )}
          </Mutation>
        )}
      </>
    )}
  </Query>
);

export default Error;
