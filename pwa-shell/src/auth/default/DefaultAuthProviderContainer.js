import { connect } from 'react-redux';

import { getUsername } from '@entando/apimanager';
import { fetchUserProfile } from 'state/thunks';

import DefaultAuthProvider from './DefaultAuthProvider';

const mapStateToProps = state => ({
  username: getUsername(state),
});

const mapDispatchToProps = dispatch => ({
  loadUserProfile: username => dispatch(fetchUserProfile(username)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultAuthProvider);
