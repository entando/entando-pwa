import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import Badge from 'ui/common/Badge';

const ContentListItem = ({ data }) => (
  <Card className="shadow ContentListItem">
    <CardHeader>
      {
        data.isUnread
          ? <Badge className="ContentListItem__status--unread">nuovo</Badge>
          : ''
      }
    </CardHeader>
    <CardBody>
      <Link to={`/content/${data.typeCode}/${data.id}${data.requiresAuth ? '?requiresAuth=true' : ''}`}>
        <div dangerouslySetInnerHTML={{__html: data.html}}>
        </div>
        <div>
          <span className="item-footer">
          </span>
        </div>
      </Link>
    </CardBody>
  </Card>
);


ContentListItem.propTypes = {
  data: PropTypes.shape({
    isUnread: PropTypes.bool,
    typeCode: PropTypes.string.isRequired,
    requiresAuth: PropTypes.bool.isRequired,
    html: PropTypes.string.isRequired,
  }),
};

ContentListItem.defaultProps = {
  data: {
    isUnread: false,
  }
}

export default ContentListItem;
