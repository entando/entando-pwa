import React from 'react';
import PropTypes from 'prop-types';
import KeycloakProviderContainer from './keycloak/KeycloakProviderContainer';
import DefaultAuthProviderContainer from 'auth/default/DefaultAuthProviderContainer';
import useKeycloak from 'auth/useKeycloak';

const Provider = useKeycloak
  ? KeycloakProviderContainer
  : DefaultAuthProviderContainer;

const AuthProvider = ({ children }) => <Provider>{children}</Provider>;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
