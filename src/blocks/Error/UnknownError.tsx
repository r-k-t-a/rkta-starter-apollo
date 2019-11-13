/* eslint-disable react/jsx-one-expression-per-line */
import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { Heading } from '@rkta/ui';
import { EmojiSad } from '@rkta/entypo';

const Box = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
  margin: auto;
  max-width: 800px;
  text-align: center;
`;

interface Props {
  message?: string;
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: Props): ReactElement => {
  return (
    <Box>
      <EmojiSad size={48} />
      <Heading baseline level={6}>
        Error {statusCode}
      </Heading>
      <Heading baseline level={2}>
        Unknown Error
      </Heading>
    </Box>
  );
};

export default ErrorPage;
