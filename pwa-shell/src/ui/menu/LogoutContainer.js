import { get } from 'lodash';
import React from 'react';
import DefaultLogoutContainer from 'ui/menu/DefaultLogoutContainer';
import KeycloakLogoutContainer from 'ui/menu/KeycloakLogoutContainer';

const useKeycloak =
  get(process.env, 'REACT_APP_AUTH_TYPE', '').toUpperCase() === 'KEYCLOAK';

const LogoutContainer = () =>
  useKeycloak ? <KeycloakLogoutContainer /> : <DefaultLogoutContainer />;

export default LogoutContainer;
