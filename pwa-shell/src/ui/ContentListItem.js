import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
} from 'reactstrap';

const ContentListItem = ({ data }) => (
  <Card className="shadow">
    <CardBody>
      <Link to={`/${data.contentType}/${data.id}`}>
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
