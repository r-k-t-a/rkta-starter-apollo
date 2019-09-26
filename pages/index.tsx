import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import Rocket from '@rkta/entypo/Rocket';
import { Heading, Button, Divider } from '@rkta/ui';

import localStatePath from 'path/localStatePath';
import DefaultLayout from 'layouts/Default';

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

const IndexPage = (): React.ReactNode => (
  <DefaultLayout>
    <Box>
      <Rocket size={56} />
      <Heading baseline level={1}>
        R-K-T-A
      </Heading>
      Poyekhali
      <Divider size={26} />
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
    </Box>
  </DefaultLayout>
);

export default IndexPage;
