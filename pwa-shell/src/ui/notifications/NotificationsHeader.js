import React from 'react';

const text = amount => {
  switch(amount) {
    case 0: return 'Non ci sono nuove notifiche';
    case 1: return 'Hai 1 nuova notifica';
    default: return `Hai ${amount} nuove notifiche`;
  }
};

const NotificationHeader = ({ notificationAmount }) => (
  <div className="NotificationsHeader">
    <div className="NotificationsHeader__title">Notifiche</div>
    { text(notificationAmount) }
  </div>
);

export default NotificationHeader;
