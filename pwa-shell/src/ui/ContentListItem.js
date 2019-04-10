import React from 'react';
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
      <Link to={`/content/${data.typeCode}/${data.id}`}>
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

export default ContentListItem;
