import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => <main>{children}</main>;

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
