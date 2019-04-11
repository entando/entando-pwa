import { connect } from 'react-redux';
import { logoutUser } from '@entando/apimanager';

import { isUserLogged } from 'state/content/selectors';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = state => ({
  isUserLogged: isUserLogged(state),
});

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser());
    dispatch(closeDrawer());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
