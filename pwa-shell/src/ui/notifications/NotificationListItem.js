import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
          <p className="date">
            <time dateTime={data.date}>{data.date}</time>
          </p>
          <h2>{data.title}</h2>
          <div className="body" dangerouslySetInnerHTML={{__html: data.body}} />
        </article>
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
