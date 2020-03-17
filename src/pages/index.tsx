/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Rocket } from '@rkta/entypo';
import { Heading, Button, Divider, Popover, List, ListButton } from '@rkta/ui';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import localStatePath from 'path/localStatePath';
import DefaultLayout from 'layouts/Default';
import { CLIENT_CONTEXT, ClientContext, SET_LANGUAGE } from 'apollo/schema';

const COUNTRIES = gql`
  query countries {
    countries {
      name
    }
  }
`;

const Box = styled.section`
  text-align: center;
  svg {
    padding-top: 56px;
    padding-bottom: 16px;
  }
  hr {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const languages = [
  {
    token: 'en',
    name: 'English',
  },
  {
    token: 'fr',
    name: 'French',
  },
  {
    token: 'ru',
    name: 'Russian',
  },
];

const IndexPage = (): React.ReactNode => {
  const { data } = useQuery(COUNTRIES);
  const { data: context } = useQuery<ClientContext>(CLIENT_CONTEXT);
  const [setLanguage] = useMutation(SET_LANGUAGE);
  const { language } = context?.clientContext || {};
  return (
    <DefaultLayout>
      <Box>
        <Rocket size={56} />
        <Heading baseline level={1}>
          R-K-T-A
        </Heading>
        <Popover>
          <Button>Poyekhali ({language}) </Button>
          <List rize={1}>
            {languages.map(({ token, name }) => (
              <ListButton
                bgColor={language === token ? 'primary1' : undefined}
                key={token}
                onClick={(): void => {
                  setLanguage({ variables: { language: token } });
                }}
              >
                {name}
              </ListButton>
            ))}
          </List>
        </Popover>
        <Divider verticalSpace={26} />
        <Link href={localStatePath()}>
          <Button blockLevel hard>
            Handle run-time errors
          </Button>
        </Link>
        <Link href="unknown-page">
          <Button blockLevel hard>
            Handle routing errors
          </Button>
        </Link>
        <Divider verticalSpace={26} />
        {data?.countries.map(({ name }: { name: string }) => (
          <div key={name}>{name}</div>
        ))}
      </Box>
    </DefaultLayout>
  );
};

export default IndexPage;
