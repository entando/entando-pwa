import React from 'react';

const Badge = ({children, className}) => (
  <span className={`Badge ${className}`}>{children}</span>
);

export default Badge;