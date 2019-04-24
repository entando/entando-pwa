import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import Badge from 'ui/common/Badge';
import ContentCategoryListContainer from 'ui/common/ContentCategoryListContainer';

const ContentListItem = ({ data }) => (
  <Card className="shadow ContentListItem">
    <CardHeader className="ContentListItem__header">
      {
        data.isUnread
          ? <Badge className="ContentListItem__status--unread">nuovo</Badge>
          : ''
      }
    </CardHeader>
    <CardBody className="ContentListItem__body">
      <ContentCategoryListContainer contentCategoryIdList={data.categories} />
      <Link className="ContentListItem__link-to-detail" to={`/content/${data.id}${data.requiresAuth ? '?requiresAuth=true' : ''}`}>
        <div dangerouslySetInnerHTML={{__html: data.html}} />
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
