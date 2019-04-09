import React, { PureComponent } from 'react';
import ContentListItem from 'ui/content-list/ContentListItem';
import { Container } from 'reactstrap';
import NotificationsHeader from 'ui/notifications/NotificationsHeader';

import logo1x from 'images/Logo_vertical@1x.png';
import logo2x from 'images/Logo_vertical@2x.png';

class NotificationList extends PureComponent {

  componentDidMount() {
    this.props.onFetchNotifications();
  }

  render() {
    const { notificationList } = this.props;
    const notificationAmount = notificationList.length;

    const items = notificationList.map((item, index) => (
      <ContentListItem data={item} key={index} />
    ));

    const emptyNotificationList = (
      <React.Fragment>
        <div className="body text-center">
          <img src={logo1x} alt="logo" className="d-sm-none"/>
          <img src={logo2x} alt="logo" className="d-none d-sm-inline"/>
          <p className="mt-1">Buona giornata</p>          
        </div>
        <div className="footer-background"></div>
      </React.Fragment>
    );

    return (
      <Container fluid className={`Notifications${notificationAmount ? '' : ' Notifications--empty'}`}>
        <NotificationsHeader notificationAmount={notificationAmount} />
        {
          notificationAmount ? (              
            <div className="Notifications__list">
              { items }
            </div>  
          ) : emptyNotificationList
        }                
      </Container>
    );
  }
}

export default NotificationList;
