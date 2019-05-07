import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';
import { FormattedMessage } from 'react-intl.macro';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Badge from 'ui/common/Badge';

const NotificationListItem = ({ data }) => (
  <Card className="shadow  NotificationListItem ">
    <CardHeader className="NotificationListItem__header">
      <Badge className="NotificationListItem__status--unread">nuovo</Badge>
    </CardHeader>  
    <CardBody className="NotificationListItem__body">
      <Link
        className="NotificationListItem__link-to-detail"
        to={`/content/${data.properties.contentType}/${data.objectId}${data.requiresAuth ? '?requiresAuth=true' : ''}`}
      >
        <article className="notification">
          <header>
            <time dateTime={data.date}>
              <FormattedDate
                value={data.date}
                year="numeric"
                month="short"
                day="numeric" />
            </time>
            <h2>{data.title}</h2>
          </header>
          <section className="body" dangerouslySetInnerHTML={{__html: data.body}} />
        </article>
        <span className="more-link">
          <FormattedMessage id="notification.readMore" defaultMessage="Continue" />
        </span>
      </Link>
    </CardBody>    
  </Card>
);

NotificationListItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.shape({
      contentType: PropTypes.string,
    }),
    objectId: PropTypes.string.isRequired,
    requiresAuth: PropTypes.bool,
    body: PropTypes.string,
  }).isRequired,
};

export default NotificationListItem;
