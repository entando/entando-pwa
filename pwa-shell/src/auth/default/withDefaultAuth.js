import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import DefaultAuthContext from 'auth/default/DefaultAuthContext';

function withDefaultAuth(WrappedComponent) {
  const Context = DefaultAuthContext;

  class WithKeycloakComponent extends Component {
    renderWrappedComponent = ({ initialized, keycloak }) => (
      <WrappedComponent
        {...this.props}
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    );

    render() {
      return <Context.Consumer>{this.renderWrappedComponent}</Context.Consumer>;
    }
  }

  return hoistStatics(WithKeycloakComponent, WrappedComponent);
}

export default withDefaultAuth;
