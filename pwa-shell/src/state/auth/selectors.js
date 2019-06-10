import { createSelector } from 'reselect';
import { KEYCLOAK_ADAPTER_NAME } from 'keycloakAdapter';

export const getAuth = state => state.auth;

export const getAuthType = createSelector(
  getAuth,
  auth => auth.type,
);

export const isKeycloakEnabled = createSelector(
  getAuthType,
  authType => authType && authType.toLowerCase() === KEYCLOAK_ADAPTER_NAME,
);

export const getAuthConfig = createSelector(
  getAuth,
  auth => auth.config,
);
