import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children, className, footer }) => (
  <div className={`Page ${className}`}>
    <div className="Page__content">
      { children }
    </div>
    <div className="Page__footer">
      { footer }
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  footer: PropTypes.node,
};

Page.defaultProps = {
  className: '',
  footer: null,
};

export default Page;
