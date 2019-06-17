import { get } from 'lodash';
import { connect } from 'react-redux';
import { withKeycloak } from 'react-keycloak';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = (state, ownProps) => ({
  isUserLogged: get(ownProps, 'keycloak.authenticated', false),
  username: get(ownProps, 'keycloak.idTokenParsed.preferred_username'),
  userFullname: `${get(ownProps, 'keycloak.idTokenParsed.given_name')} ${get(
    ownProps,
    'keycloak.idTokenParsed.family_name',
  )}`,
});

// TODO: remove unsetUser and add logoutUserWithoutRedirect to apiManager actions
const unsetUser = () => ({
  type: 'current-user/unset-user',
  payload: {
    user: {
      username: null,
      token: null,
      tokenRefresh: null,
    },
  },
});

const logoutUserWithoutRedirect = () => dispatch => {
  dispatch(unsetUser());

  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('tokenRefresh');
};
//

export const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: () => {},
  logoutUser: () => {
    const logout = get(ownProps, 'keycloak.logout');
    logout();
    dispatch(logoutUserWithoutRedirect());
    dispatch(closeDrawer());
  },
});

export default withKeycloak(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Logout),
);
