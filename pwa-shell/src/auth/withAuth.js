import React from 'react';
import { compose } from 'redux';
import { withKeycloak } from 'react-keycloak';
import withDefaultAuth from 'auth/default/withDefaultAuth';
import useKeycloak from 'auth/useKeycloak';

const withKeycloakAdapter = WrappedComponent => props => {
  const { keycloakInitialized, keycloak, ...otherProps } = props;
  return (
    <WrappedComponent
      {...otherProps}
      authInitialized={keycloakInitialized}
      auth={keycloak}
    />
  );
};

const withAuth = useKeycloak
  ? compose(
      withKeycloak,
      withKeycloakAdapter,
    )
  : withDefaultAuth;

export default withAuth;
