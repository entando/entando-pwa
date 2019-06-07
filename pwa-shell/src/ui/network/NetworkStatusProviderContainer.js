import { connect } from 'react-redux';
import { setStatus } from 'state/network/actions';

import NetworkStatusProvider from 'ui/network/NetworkStatusProvider';

export const mapDispatchToProps = dispatch => ({
  onStatusChange: status => {
    dispatch(setStatus(status));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(NetworkStatusProvider);
