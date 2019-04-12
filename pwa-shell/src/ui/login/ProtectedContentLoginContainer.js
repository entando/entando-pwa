import { connect } from 'react-redux';
import { isSelectedContentAvailable } from 'state/content/selectors';
import Login from 'ui/login/Login';

export const mapStateToProps = state => ({
  hasAccess: isSelectedContentAvailable(state),
});

export default connect(
  mapStateToProps,
  null,
)(Login);
