import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  render() {
    const { children, className, footer } = this.props;
    return (
      <div className={`Page ${className}`}>
        <div className="Page__content">{children}</div>
        <div className="Page__footer">{footer}</div>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.willUnmount();
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  footer: PropTypes.node,
  willUnmount: PropTypes.func.isRequired,
};

Page.defaultProps = {
  className: '',
  footer: null,
};

export default Page;
