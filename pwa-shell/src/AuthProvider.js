import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keycloakAdapter } from 'keycloakAdapter';

const authAdapters = {
  keycloak: keycloakAdapter,
};

class AuthProvider extends Component {
  authProps = null;
  authComponent = React.Fragment;

  constructor(props) {
    super(props);
    const { authType } = this.props;
    if (authType && authAdapters[authType]) {
      const { authComponent, authProps } = authAdapters[authType](this.props);
      this.authComponent = authComponent;
      this.authProps = authProps;
    }
  }

  render() {
    const { children } = this.props;
    const AuthComponent = this.authComponent;
    return <AuthComponent {...this.authProps}>{children}</AuthComponent>;
  }
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  authType: PropTypes.string.isRequired,
};

export default AuthProvider;
