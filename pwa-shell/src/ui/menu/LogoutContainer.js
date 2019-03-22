import { connect } from 'react-redux';
import { logoutUser } from '@entando/apimanager';

import { closeDrawer } from 'state/drawer/actions';
import Logout from 'ui/menu/Logout';

export const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser());
    dispatch(closeDrawer());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
