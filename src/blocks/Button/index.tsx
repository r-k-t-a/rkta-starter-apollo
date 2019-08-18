import * as React from 'react';
import * as PropTypes from 'prop-types';

const Button = ({ children, ...rest }): React.ReactNode => (
  <button type="button" {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
