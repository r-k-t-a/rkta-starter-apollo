import React, { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props): ReactElement => <main>{children}</main>;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
