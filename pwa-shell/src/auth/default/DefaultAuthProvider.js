import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultAuthProvider extends Component {
  render() {
    return <>{this.props.children}</>;
  }
}

DefaultAuthProvider.propTypes = {
  auth: PropTypes.object.isRequired,
  authInitialized: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default DefaultAuthProvider;
