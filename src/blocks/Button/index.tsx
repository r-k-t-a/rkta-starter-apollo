import React, { ReactElement, ButtonHTMLAttributes, ReactNode, SFC } from 'react';
import PropTypes from 'prop-types';

interface Props {
  children: ReactNode;
  onClick?: Function;
}

const Button: SFC<Props> = ({ children, ...rest }: ButtonHTMLAttributes<Props>): ReactElement => (
  <button type="button" {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
