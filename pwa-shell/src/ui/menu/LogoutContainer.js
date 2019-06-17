import React from 'react';
import DefaultLogoutContainer from 'ui/menu/DefaultLogoutContainer';
import KeycloakLogoutContainer from 'ui/menu/KeycloakLogoutContainer';

const LogoutContainer = () =>
  process.env.REACT_APP_AUTH_TYPE === 'keycloak' ? (
    <KeycloakLogoutContainer />
  ) : (
    <DefaultLogoutContainer />
  );

export default LogoutContainer;
