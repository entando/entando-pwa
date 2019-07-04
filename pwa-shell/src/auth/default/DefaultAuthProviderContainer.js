import { connect } from 'react-redux';

import { getUsername } from '@entando/apimanager';
import { fetchUserProfile } from 'state/thunks';
import { isUserLogged } from 'state/user-profile/selectors';
import { throttle } from '@entando/utils';

import DefaultAuthProvider from './DefaultAuthProvider';

const mapStateToProps = state => ({
  isUserLogged: isUserLogged(state),
  username: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  loadUserProfile: username =>
    throttle(() => dispatch(fetchUserProfile(username))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultAuthProvider);
