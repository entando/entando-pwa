import { connect } from 'react-redux';
import { clearAllNotifications } from 'state/thunks';
import NotificationsTopBar from 'ui/notifications//NotificationsTopBar';

export const mapStateToProps = null;

export const mapDispatchToProps = dispatch => ({
  clearAllNotifications: () => dispatch(clearAllNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTopBar);
