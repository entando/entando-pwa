import { connect } from 'react-redux';
import { getUsername } from '@entando/apimanager';
import Login from 'ui/login/Login';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export default connect(
  mapStateToProps,
  null,
)(Login);
