import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from '@emotion/styled';
import { Addon, Button, List, ListItem, ListTitle, useFx } from '@rkta/ui';
import { Cross } from '@rkta/entypo';

import { Error } from 'apollo/resolve/pushLocalError';
import POP_ERROR from 'apollo/mutation/popLocalError.graphql';

const Box = styled(List)`
  bottom: 16px;
  min-width: 320px;
  position: fixed;
  right: 16px;
  button {
    margin-right: 8px;
  }
`;

const ApolloError = ({ message, name }: Error): JSX.Element => {
  const [popError] = useMutation(POP_ERROR);
  const [fx, setFx] = useFx('popUp', {
    onFadeDown: popError,
  });
  return (
    <Box {...fx} bgColor="text" color="paper" rize={1}>
      <ListTitle color="error" fitAll>
        <Addon main>{name}</Addon>
        <Button
          color="paper"
          round
          transparent
          onClick={(): void => {
            setFx('fadeDown');
          }}
        >
          <Cross />
        </Button>
      </ListTitle>
      <ListItem>{message}</ListItem>
    </Box>
  );
};

export default ApolloError;
