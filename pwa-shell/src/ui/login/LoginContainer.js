import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isUserLogged } from 'state/content/selectors';
import Login from 'ui/login/Login';

export const mapStateToProps = state => ({
  hasAccess: isUserLogged(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Login),
);
