import React from 'react';

const text = amount => {
  switch(amount) {
    case 0: return 'Non ci sono nuove notifiche';
    case 1: return 'Hai 1 nuova notifica';
    default: return `Hai ${amount} nuove notifiche`;
  }
};

const NotificationHeader = ({ notificationAmount }) => (
  <div className="NotificationsHeader px-3 pb-3">
    <div className="NotificationsHeader__title">Notifiche</div>
    <div className="pt-1">{ text(notificationAmount) }</div>    
  </div>
);

export default NotificationHeader;
