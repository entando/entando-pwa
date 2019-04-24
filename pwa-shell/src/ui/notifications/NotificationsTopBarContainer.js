import { connect } from 'react-redux';
import { clearAllNotifications } from 'state/thunks';
import { getSelectedContentType } from 'state/contentType/selectors';
import NotificationsTopBar from 'ui/notifications//NotificationsTopBar';

export const mapStateToProps = state => ({
  contentType: getSelectedContentType(state),
});

export const mapDispatchToProps = dispatch => ({
  clearAllNotifications: () => dispatch(clearAllNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsTopBar);
