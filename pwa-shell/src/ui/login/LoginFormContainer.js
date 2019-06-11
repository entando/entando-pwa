import { connect } from 'react-redux';
import { login as performLogin } from 'state/thunks';
import LoginForm from 'ui/login/LoginForm';

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(performLogin(data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
