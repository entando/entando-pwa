import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';
import { connect } from 'react-redux';
import { setUserProfile } from 'state/user-profile/actions';
import { loginUser, logoutUser } from '@entando/apimanager';

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
});

// no need to load profile in Keycloak auth since it is already set from onAuthSuccess event
keycloak.loadLoggedEntandoUser = () => {};

export const mapStateToProps = state => ({
  keycloak,
});

const parseUserInfo = ({ name }) => ({
  attributes: [
    {
      code: 'fullname',
      value: name,
    },
  ],
});

export const mapDispatchToProps = dispatch => ({
  onEvent: (event, error) => {
    switch (event) {
      case 'onAuthSuccess':
        dispatch(
          loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token),
        );
        dispatch(setUserProfile(parseUserInfo(keycloak.idTokenParsed)));
        break;
      case 'onAuthRefreshSuccess':
        dispatch(
          loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token),
        );
        break;
      case 'onAuthRefreshError':
        dispatch(logoutUser());
        break;
      default:
        break;
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeycloakProvider);
