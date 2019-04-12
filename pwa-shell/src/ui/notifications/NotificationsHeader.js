import React from 'react';
import PropTypes from 'prop-types';

const text = amount => {
  switch(amount) {
    case 0: return 'Non ci sono nuove notifiche';
    case 1: return (
      <React.Fragment>
        Hai <span className="NotificationsHeader__amount">1</span> nuova notifica
      </React.Fragment>
    );
    default: return (
      <React.Fragment>
        Hai <span className="NotificationsHeader__amount">{amount}</span> nuove notifiche
      </React.Fragment>
    );
  }
};

const NotificationHeader = ({ notificationAmount }) => (
  <div className="NotificationsHeader px-3 pb-3">
    <div className="NotificationsHeader__title">Notifiche</div>
    <div className="pt-1">{ text(notificationAmount) }</div>    
  </div>
);

NotificationHeader.propTypes = {
  notificationAmount: PropTypes.number.isRequired,
};

export default NotificationHeader;
