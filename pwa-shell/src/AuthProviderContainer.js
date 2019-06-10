import { connect } from 'react-redux';
import AuthProvider from 'AuthProvider';
import { loginUser } from '@entando/apimanager';
import { getAuthType, getAuthConfig } from 'state/auth/selectors';

export const mapStateToProps = state => ({
  authType: getAuthType(state),
  authConfig: getAuthConfig(state),
});

export const mapDispatchToProps = dispatch => ({
  onAuthSuccess: keycloak =>
    dispatch(
      loginUser(keycloak.idTokenParsed.preferred_username, keycloak.token),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthProvider);
