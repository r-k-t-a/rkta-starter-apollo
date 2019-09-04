import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Paper, Button } from 'rkta-ui';
import Cross from 'rkta-ui/lib/entypo/Cross';
import { keyframes } from '@emotion/core';

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const popOut = keyframes`
  to {
    opacity: 0;
    transform: translateY(80px);
  }
`;

const Box = styled(Paper)`
  animation: ${({ isOff }) => (isOff ? popOut : popIn)} 0.6s ease;
  position: fixed;
  bottom: 8px;
  left: 8px;
  right: 8px;
  max-width: 320px;
  will-change: opacity, transform;
  z-index: 15;
  .heading {
    align-items: center;
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    padding-left: 16px;
  }
  .message {
    padding: 16px;
    padding-top: 0;
  }
`;

const PopOver = ({ error, onClose }) => {
  const [isOff, setIsOff] = useState(false);
  const status = error.detail ? `${error.status} ${error.statusText}` : error.status;
  const message = error.detail || error.statusText;
  return (
    <Box
      rize={1}
      text
      color="paper"
      isOff={isOff}
      onAnimationEnd={() => {
        if (isOff) onClose();
      }}
    >
      <div className="heading">
        <span>Error - {status}</span>
        <Button
          hardTop
          hardRight
          transparent
          color="paper"
          fitAll
          size={48}
          onClick={() => setIsOff(true)}
        >
          <Cross />
        </Button>
      </div>
      <div className="message">{message}</div>
    </Box>
  );
};

PopOver.propTypes = {
  error: PropTypes.shape({
    detail: PropTypes.string,
    status: PropTypes.string.isRequired,
    statusText: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PopOver;
