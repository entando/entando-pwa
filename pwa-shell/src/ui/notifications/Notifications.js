import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NotificationListItem from 'ui/notifications/NotificationListItem';
import NotificationsHeader from 'ui/notifications/NotificationsHeader';
import NotificationsTopBarContainer from 'ui/notifications/NotificationsTopBarContainer';

import logo1x from 'images/Logo_vertical@1x.png';
import logo2x from 'images/Logo_vertical@2x.png';
import Page from 'ui/common/Page';

class Notifications extends PureComponent {

  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { notificationList } = this.props;
    const notificationAmount = notificationList.length;

    const items = notificationList.map((item, index) => (
      <NotificationListItem data={item} key={index} />
    ));

    const emptyNotificationList = (
      <div className="Notifications--empty__body text-center">
        <img src={logo1x} alt="logo" className="d-sm-none"/>
        <img src={logo2x} alt="logo" className="d-none d-sm-inline"/>
        <p className="mt-1">Buona giornata</p>          
      </div>
    );

    return (
      <Page
        className={`Notifications${notificationAmount ? '' : ' Notifications--empty'}`}
      >            
        <NotificationsHeader notificationAmount={notificationAmount} />
        {
          notificationAmount ? (              
            <div className="Notifications__list">
              { items }
            </div>  
          ) : emptyNotificationList
        }                
      </Page>
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
