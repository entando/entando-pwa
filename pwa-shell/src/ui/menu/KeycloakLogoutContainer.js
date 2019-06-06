import { get } from 'lodash';
import { connect } from 'react-redux';
import { withKeycloak } from 'react-keycloak';
import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapStateToProps = (state, ownProps) => ({
  isUserLogged: get(ownProps, 'keycloak.authenticated', false),
  username: get(ownProps, 'keycloak.idTokenParsed', 'MALE :('),
  userFullname: 'KEYCLOAK', //getUserFullname(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: () => {},
  logoutUser: () => {
    const logout = get(ownProps, 'keycloak.logout');
    logout();
    dispatch(closeDrawer());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withKeycloak(Logout));
