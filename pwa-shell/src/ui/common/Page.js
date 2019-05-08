import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children, className, header, footer }) => (
  <div className={`Page ${className}`}>
    <div className="Page__header">
      { header }
    </div>
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
  header: PropTypes.node,
  footer: PropTypes.node,
};

Page.defaultProps = {
  className: '',
  header: null,
  footer: null,
};

export default Page;
