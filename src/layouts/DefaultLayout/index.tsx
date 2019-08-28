import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }): ReactElement => <main>{children}</main>;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
