import React from 'react';
import DefaultLogoutContainer from 'ui/menu/DefaultLogoutContainer';
import KeycloakLogoutContainer from 'ui/menu/KeycloakLogoutContainer';
import useKeycloak from 'auth/useKeycloak';

const LogoutContainer = () =>
  useKeycloak ? <KeycloakLogoutContainer /> : <DefaultLogoutContainer />;

export default LogoutContainer;
