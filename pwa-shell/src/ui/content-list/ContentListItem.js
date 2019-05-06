import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import ItemCategoryListContainer from 'ui/common/ItemCategoryListContainer';

const ContentListItem = ({ data }) => (
  <Card className="shadow ContentListItem">
    <CardBody className="ContentListItem__body">
      <ItemCategoryListContainer categoryIdList={data.categories} />
      <Link className="ContentListItem__link-to-detail" to={`/content/${data.typeCode}/${data.id}${data.requiresAuth ? '?requiresAuth=true' : ''}`}>
        <div dangerouslySetInnerHTML={{__html: data.html}} />
      </Link>
    </CardBody>
  </Card>
);

ContentListItem.propTypes = {
  data: PropTypes.shape({
    typeCode: PropTypes.string.isRequired,
    requiresAuth: PropTypes.bool.isRequired,
    html: PropTypes.string.isRequired,
  }),
};

export default ContentListItem;
