import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const DefaultRedirect = ({ defaultContentTypeCode }) => (
  <Redirect to={defaultContentTypeCode ? `/content/${defaultContentTypeCode}` : ''} />
);

DefaultRedirect.propTypes = {
  defaultContentTypeCode: PropTypes.string.isRequired,
};

export default DefaultRedirect;
