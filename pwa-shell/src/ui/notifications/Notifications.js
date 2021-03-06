import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotificationListItem from 'ui/notifications/NotificationListItem';
import NotificationsHeader from 'ui/notifications/NotificationsHeader';
import { FormattedMessage } from 'react-intl.macro';

import logo1x from 'images/Logo_vertical@1x.png';
import logo2x from 'images/Logo_vertical@2x.png';
import PageContainer from 'ui/common/PageContainer';

class Notifications extends PureComponent {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { notificationList, requiresAuthMap } = this.props;
    const notificationAmount = notificationList.length;

    const items = notificationList.map((item, index) => (
      <NotificationListItem
        data={item}
        requiresAuth={requiresAuthMap[item.objectId]}
        key={index}
      />
    ));

    const emptyNotificationList = (
      <div className="Notifications--empty__body text-center">
        <img src={logo1x} alt="logo" className="d-sm-none" />
        <img src={logo2x} alt="logo" className="d-none d-sm-inline" />
        <p className="mt-1">
          <FormattedMessage
            id="notification.emptyNotifMidLabel"
            defaultMessage="Have a great day!"
          />
        </p>
      </div>
    );

    return (
      <PageContainer
        className={`Notifications${
          notificationAmount ? '' : ' Notifications--empty'
        }`}
      >
        <NotificationsHeader notificationAmount={notificationAmount} />
        {notificationAmount ? (
          <div className="Notifications__list">{items}</div>
        ) : (
          emptyNotificationList
        )}
      </PageContainer>
    );
  }
}

Notifications.propTypes = {
  notificationList: PropTypes.arrayOf(PropTypes.shape({})),
  fetchNotifications: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notificationList: [],
};

export default Notifications;
