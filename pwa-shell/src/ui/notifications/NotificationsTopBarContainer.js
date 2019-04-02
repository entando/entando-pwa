import { connect } from 'react-redux';
import { clearNotifications } from 'state/thunks';
import NotificationsTopBar from 'ui/notifications//NotificationsTopBar';

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => ({
  clearNotifications: () => dispatch(clearNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTopBar);
