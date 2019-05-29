import { connect } from 'react-redux';
import Login from 'ui/login/LoginForm';
import { login as performLogin } from 'state/thunks';

export const mapDispatchToProps = (dispatch) => ({
  onSubmit: data => dispatch(performLogin(data)),
});

export default connect(null, mapDispatchToProps)(Login);
