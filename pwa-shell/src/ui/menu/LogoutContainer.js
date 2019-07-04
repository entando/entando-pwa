import { connect } from 'react-redux';
import { get } from 'lodash';

import withAuth from 'auth/withAuth';

import { logoutUserWithoutRedirect } from 'state/user-profile/actions';
import { isUserLogged } from 'state/user-profile/selectors';
import { getUserFullname } from 'state/user-profile/selectors';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = state => ({
  isUserLogged: isUserLogged(state),
  userFullname: getUserFullname(state),
});

export const mapDispatchToProps = (dispatch, { auth }) => ({
  logoutUser: () => {
    const logout = get(auth, 'logout');
    logout();
    dispatch(logoutUserWithoutRedirect());
    dispatch(closeDrawer());
  },
});

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Logout),
);
