import React from 'react';
import PropTypes from 'prop-types';

const PageContainer = ({ children, className }) => (
  <div className={`PageContainer ${className}`}>
    <div>
      { children }
    </div>
    <div className="PageContainer__footer"></div>
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
};

PageContainer.defaultProps = {
  className: '',
};

export default PageContainer;
