import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Rocket } from '@rkta/entypo';
import { Heading, Button, Divider } from '@rkta/ui';
import { useQuery } from '@apollo/react-hooks';

import localStatePath from 'path/localStatePath';
import DefaultLayout from 'layouts/Default';

import COUNTRIES from 'apollo/query/countries-query.graphql';

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

const IndexPage = (): React.ReactNode => {
  const { data } = useQuery(COUNTRIES);
  return (
    <DefaultLayout>
      <Box>
        <Rocket size={56} />
        <Heading baseline level={1}>
          R-K-T-A
        </Heading>
        Poyekhali
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
        {data && data.countries.map(({ name }: { name: string }) => <div key={name}>{name}</div>)}
      </Box>
    </DefaultLayout>
  );
};

export default IndexPage;
