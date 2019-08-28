import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, ...rest }): ReactElement => (
  <button type="button" {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
