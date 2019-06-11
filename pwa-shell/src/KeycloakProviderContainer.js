import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { loginUser } from '@entando/apimanager';

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});

export const mapStateToProps = state => ({
  keycloak,
});

export const mapDispatchToProps = dispatch => ({
  onEvent: (event, error) => {
    if (event === 'onAuthSuccess') {
      dispatch(
        loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token),
        //TODO set user profile
        //TODO set keycloak object
      );
    } else if (event === 'onAuthRefreshSuccess') {
      dispatch(
        loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token),
      );
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeycloakProvider);
