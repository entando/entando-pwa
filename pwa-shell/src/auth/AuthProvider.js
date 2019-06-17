import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import KeycloakProviderContainer from './keycloak/KeycloakProviderContainer';
import DefaultAuthProvider from './default/DefaultAuthProvider';

const useKeycloak =
  get(process.env, 'REACT_APP_AUTH_TYPE', '').toUpperCase() === 'KEYCLOAK';

const Provider = useKeycloak ? KeycloakProviderContainer : DefaultAuthProvider;

const AuthProvider = ({ children }) => <Provider>{children}</Provider>;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
