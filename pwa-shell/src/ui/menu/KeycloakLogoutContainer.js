import { get } from 'lodash';
import { connect } from 'react-redux';
import { withKeycloak } from 'react-keycloak';
import { logoutUser } from '@entando/apimanager';
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

export const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: () => {},
  logoutUser: () => {
    const logout = get(ownProps, 'keycloak.logout');
    logout();
    dispatch(logoutUser());
    dispatch(closeDrawer());
  },
});

export default withKeycloak(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Logout),
);
