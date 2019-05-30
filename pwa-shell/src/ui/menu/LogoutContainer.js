import { connect } from 'react-redux';
import { getUsername, logoutUser } from '@entando/apimanager';

import { isUserLogged } from 'state/content/selectors';
import { fetchUserProfile } from 'state/thunks';
import { getUserFullname } from 'state/user-profile/selectors';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = state => ({
  isUserLogged: isUserLogged(state),
  username: getUsername(state),
  userFullname: getUserFullname(state),
});

export const mapDispatchToProps = dispatch => ({
  loadUserProfile: (username) => dispatch(fetchUserProfile(username)),
  logoutUser: () => {
    dispatch(logoutUser());
    dispatch(closeDrawer());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
