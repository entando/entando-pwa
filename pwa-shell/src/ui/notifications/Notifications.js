import React, { PureComponent } from 'react';
import ContentListItem from 'ui/ContentListItem';
import { Container } from 'reactstrap';
import NotificationsHeader from 'ui/notifications/NotificationsHeader';

class NotificationList extends PureComponent {

  componentDidMount() {
    this.props.onFetchNotifications();
  }

  componentDidUpdate(prevProps) {
    if (this.props.contentType !== prevProps.contentType) {
      this.props.onFetchNotifications();
    }
  }

  render() {
    const { notificationList } = this.props;
    const notificationAmount = notificationList.length;

    const items = notificationList.map((item, index) => (
      <ContentListItem data={item} key={index} />
    ));

    return (
      <Container fluid className="content Notifications">
        <NotificationsHeader notificationAmount={notificationAmount} />
        <div>
          { items }
        </div>
      </Container>
    );
  }
}

export default NotificationList;
