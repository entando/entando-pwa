import { connect } from 'react-redux';
import { login as performLogin } from 'state/thunks';
import LoginForm from 'ui/login/LoginForm';
import KeycloakLoginForm from 'ui/login/KeycloakLoginForm';

let mapDispatchToProps;
let LoginFormContainer;

if (process.env.REACT_APP_USE_KEYCLOAK === 'true') {
  LoginFormContainer = KeycloakLoginForm;
} else {
  mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch(performLogin(data)),
  });
  LoginFormContainer = connect(
    null,
    mapDispatchToProps,
  )(LoginForm);
}

export default LoginFormContainer;
