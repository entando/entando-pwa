import { connect } from 'react-redux';
import { login as performLogin } from 'state/thunks';
import LoginForm from 'ui/login/LoginForm';

const mapDispatchToProps = (dispatch, { history, location }) => ({
  onSubmit: data =>
    dispatch(performLogin(data)).then(() => {
      const redirectURI = new URLSearchParams(location.search).get(
        'redirect_uri',
      );
      history.replace(redirectURI ? redirectURI : '/');
    }),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
