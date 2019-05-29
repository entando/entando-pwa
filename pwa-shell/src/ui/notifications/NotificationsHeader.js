import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl.macro';

const NotificationHeader = ({ notificationAmount }) => {
  return (
    <div className="NotificationsHeader px-3 pb-3">
      <div className="NotificationsHeader__title">
        <FormattedMessage
          id="notification.headerNotif"
          defaultMessage="Notifications"
        />
      </div>
      <div className="pt-1">
        <FormattedMessage
          id="notification.headerNotifMessage"
          defaultMessage="{count,plural,=0{No new notifications}one{You have a new notification}other{You have {amount} new notifications}}"
          values={{
            count: notificationAmount,
            amount: (
              <span className="NotificationsHeader__amount">
                {notificationAmount}
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
};

NotificationHeader.propTypes = {
  notificationAmount: PropTypes.number.isRequired,
};

export default NotificationHeader;
