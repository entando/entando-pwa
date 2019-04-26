import { connect } from 'react-redux';
import { setStatus } from 'state/network/actions';
import { isOffline } from 'state/network/selectors';
import NetworkStatus from 'ui/network/NetworkStatus';

export const mapStateToProps = state => ({
  isOffline: isOffline(state)
});

export const mapDispatchToProps = dispatch => ({
  onStatusChange: status => {
    dispatch(setStatus(status));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkStatus);
