import { connect } from 'react-redux';
import { fetchNotifications, clearNotification } from 'state/thunks';
import { getNotificationList } from 'state/notification/selectors';
import Notifications from 'ui/notifications/Notifications';
import { getRequiresAuthMap } from 'state/content/selectors';

export const mapStateToProps = state => {
  return {
    notificationList: getNotificationList(state),
    requiresAuthMap: getRequiresAuthMap(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(fetchNotifications()),
  clearNotification: id => dispatch(clearNotification(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
