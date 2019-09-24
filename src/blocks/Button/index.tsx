import React, { ReactElement, ButtonHTMLAttributes, ReactNode, SFC } from 'react';

interface Props {
  children: ReactNode;
  onClick?: Function;
}

const Button: SFC<Props> = ({ children, ...rest }: ButtonHTMLAttributes<Props>): ReactElement => (
  <button type="button" {...rest}>
    {children}
  </button>
);

export default Button;
