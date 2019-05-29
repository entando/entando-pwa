import { connect } from 'react-redux';
import { isOffline } from 'state/network/selectors';
import NetworkOfflineWarning from 'ui/network/NetworkOfflineWarning';

export const mapStateToProps = state => ({
  isOffline: isOffline(state),
});

export default connect(
  mapStateToProps,
  null,
)(NetworkOfflineWarning);
