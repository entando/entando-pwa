import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage, defineMessages } from 'react-intl.macro';
import { messagePluralObjectToString } from 'i18n/locales';

const messages = defineMessages({
  headerNotifMessage: {
    id: 'notification.headerNotifMessage',
    defaultMessage: messagePluralObjectToString({
      $0: 'No new notifications',
      one: 'You have a new notification.',
      other: 'You have {count} new notifications',
    }),
  },
});

const text = (amount, caption) => {
  if (amount > 0) {
    const match = caption.match(/(\d[^\s])*/);
    if (match === null) {
      return caption;
    }
    const strParts = caption.split(` ${amount} `);
    return (
      <React.Fragment>
        {strParts[0]} <span className="NotificationsHeader__amount">{amount}</span> {strParts[1]}
      </React.Fragment>
    );
  }
  return caption;
};

const NotificationHeader = ({ intl, notificationAmount }) => {
  const caption = intl.formatMessage(messages.headerNotifMessage, { count: notificationAmount });
  return (
    <div className="NotificationsHeader px-3 pb-3">
      <div className="NotificationsHeader__title">
        <FormattedMessage id="notification.headerNotif" defaultMessage="Notifications" />
      </div>
      <div className="pt-1">{ text(notificationAmount, caption) }</div>    
    </div>
  );
};

NotificationHeader.propTypes = {
  intl: intlShape.isRequired,
  notificationAmount: PropTypes.number.isRequired,
};

export default injectIntl(NotificationHeader);
