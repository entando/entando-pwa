import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsername } from '@entando/apimanager';
import Login from 'ui/login/Login';

export const mapStateToProps = state => ({
  username: getUsername(state),
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Login));
