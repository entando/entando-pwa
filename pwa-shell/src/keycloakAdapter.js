import { KeycloakProvider } from 'react-keycloak';
import Keycloak from 'keycloak-js';

export const KEYCLOAK_ADAPTER_NAME = 'keycloak';

export const keycloakAdapter = ({ authConfig, onAuthSuccess }) => {
  const authComponent = KeycloakProvider;
  const keycloak = new Keycloak(authConfig);
  const onEvent = event => {
    if (event === 'onAuthSuccess') {
      onAuthSuccess(keycloak);
    }
  };
  const authProps = { keycloak, onEvent };
  return { authComponent, authProps };
};
