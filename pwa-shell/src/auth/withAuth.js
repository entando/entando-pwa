import React from 'react';
import { compose } from 'redux';
import { withKeycloak } from 'react-keycloak';
import withDefaultAuth from 'auth/default/withDefaultAuth';

const withKeycloakAdapter = WrappedComponent => {
  return props => {
    const { keycloakInitialized, keycloak, ...otherProps } = props;
    return (
      <WrappedComponent
        {...otherProps}
        authInitialized={keycloakInitialized}
        auth={keycloak}
      />
    );
  };
};

const useKeycloak = process.env.REACT_APP_AUTH_TYPE === 'keycloak';
const withAuth = useKeycloak
  ? compose(
      withKeycloak,
      withKeycloakAdapter,
    )
  : withDefaultAuth;

export default withAuth;
