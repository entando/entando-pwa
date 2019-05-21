import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl.macro';

const text = (amount) => (
  <React.Fragment>
    <FormattedMessage
      id="notification.headerNotifMessage"
      defaultMessage="{count,plural,=0{No new notifications}one{You have a new notification}other{You have {amount} new notifications}}"
      values={{ count: amount, amount: <span className="NotificationsHeader__amount">{amount}</span> }}
    />
  </React.Fragment>
);

const NotificationHeader = ({ notificationAmount }) => {
  return (
    <div className="NotificationsHeader px-3 pb-3">
      <div className="NotificationsHeader__title">
        <FormattedMessage id="notification.headerNotif" defaultMessage="Notifications" />
      </div>
      <div className="pt-1">{ text(notificationAmount) }</div>    
    </div>
  );
};

NotificationHeader.propTypes = {
  notificationAmount: PropTypes.number.isRequired,
};

export default NotificationHeader;
