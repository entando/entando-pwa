import { connect } from 'react-redux';
import { get } from 'lodash';
import { getUsername, logoutUser } from '@entando/apimanager';

import withAuth from 'auth/withAuth';

import { logoutUserWithoutRedirect } from 'state/user-profile/actions';
import { isUserLogged } from 'state/user-profile/selectors';
import { fetchUserProfile } from 'state/thunks';
import { getUserFullname } from 'state/user-profile/selectors';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = state => ({
  isUserLogged: isUserLogged(state),
  username: getUsername(state),
  userFullname: getUserFullname(state),
});

export const mapDispatchToProps = (dispatch, { useKeycloak, auth }) => ({
  loadUserProfile: username => {
    if (!useKeycloak) {
      dispatch(fetchUserProfile(username));
    }
  },
  logoutUser: () => {
    if (useKeycloak) {
      const logout = get(auth, 'logout');
      logout();
      dispatch(logoutUserWithoutRedirect());
    } else {
      dispatch(logoutUser());
    }
    dispatch(closeDrawer());
  },
});

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Logout),
);
