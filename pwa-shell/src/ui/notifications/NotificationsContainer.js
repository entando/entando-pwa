import { connect } from 'react-redux';
import { fetchNotifications } from 'state/thunks';
import { getNotificationList } from 'state/notification/selectors';
import Notifications from 'ui/notifications/Notifications';

export const mapStateToProps = state => {
  return {
    notificationList: getNotificationList(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  onFetchNotifications: () => {
    dispatch(fetchNotifications());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
