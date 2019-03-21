import { connect } from 'react-redux';
import Login from 'ui/login/LoginForm';

export const mapDispatchToProps = () => ({
  onSubmit: data => {
    console.log(data);
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
