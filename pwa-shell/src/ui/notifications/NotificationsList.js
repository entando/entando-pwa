import React, { PureComponent } from 'react';
import ContentListItem from 'ui/ContentListItem';
import { Container } from 'reactstrap';

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

    // TODO remove that hardcoded 'NWS'
    const items = notificationList.map((item, index) => (
      <ContentListItem index={index} data={{...item, contentType: 'NWS'}} key={index} />
    ));

    return (
      <Container fluid className="content">        
        { notificationAmount } notifiche
        <div>
          { items }
        </div>
      </Container>
    );
  }
}

export default NotificationList;
