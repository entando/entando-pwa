import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({children, className}) => (
  <span className={`Badge ${className}`}>{children}</span>
);

Badge.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {  
  className: '',
};

export default Badge;
