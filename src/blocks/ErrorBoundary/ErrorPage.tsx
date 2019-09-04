/* eslint-disable react/jsx-one-expression-per-line */
import React, { ReactElement } from 'react';
import get from 'lodash/get';
import styled from '@emotion/styled';

import { Heading } from '@rkta/ui';
import EmojiSad from '@rkta/entypo/EmojiSad';

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
  error: Error;
}

const ErrorPage = ({ error }: Props): ReactElement => {
  const message = get(error, 'message', 'Unknown Error');
  const statusCode = get(error, 'statusCode', 500);
  return (
    <Box>
      <EmojiSad size={48} />
      <Heading baseline level={6}>
        Error {statusCode}
      </Heading>
      <Heading baseline level={2}>
        {message}
      </Heading>
    </Box>
  );
};

export default ErrorPage;
