import PropTypes from 'prop-types';
import { withKeycloak } from 'react-keycloak';

const KeycloakLoginRedirect = ({ keycloak, keycloakInitialized }) => {
  keycloakInitialized && keycloak && keycloak.login();
  return '';
};

KeycloakLoginRedirect.propTypes = {
  keycloak: PropTypes.object.isRequired,
  keycloakInitialized: PropTypes.bool.isRequired,
};

export default withKeycloak(KeycloakLoginRedirect);
