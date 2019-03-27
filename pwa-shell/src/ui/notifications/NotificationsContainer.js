import { connect } from 'react-redux';
import { fetchNotifications } from 'state/thunks';
import { getNotificationList } from 'state/notification/selectors';
import NotificationList from 'ui/notifications/NotificationsList';

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
)(NotificationList);
