import React from 'react';
import PropTypes from 'prop-types';
import KeycloakProviderContainer from './keycloak/KeycloakProviderContainer';
import DefaultAuthProvider from 'auth/default/DefaultAuthProvider';
import useKeycloak from 'auth/useKeycloak';
import { setKeycloakAuthType } from 'state/user-profile/actions';

const Provider = useKeycloak ? KeycloakProviderContainer : DefaultAuthProvider;

const AuthProvider = ({ store, children }) => {
  if (useKeycloak) store.dispatch(setKeycloakAuthType());
  return <Provider>{children}</Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
