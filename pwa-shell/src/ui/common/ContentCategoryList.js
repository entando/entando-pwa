import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'ui/common/Badge';

const ContentCategoryList = ({ categoryList }) => categoryList && categoryList.length ? (
  <span className="ContentCategoryList">
    {
      categoryList.map(category => (
        <Badge key={category.id}>{category.titles['it']}</Badge>
      ))
    }
  </span>
) : '';

ContentCategoryList.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.object),
};

ContentCategoryList.defaultProps = {
  categoryList: [],
};

export default ContentCategoryList;
