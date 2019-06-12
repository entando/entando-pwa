import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'ui/common/Badge';

const ItemCategoryList = ({ itemCategoryList, lang }) =>
  itemCategoryList && itemCategoryList.length ? (
    <span className="ItemCategoryList">
      {itemCategoryList.map(category => (
        <Badge key={category.code}>{category.titles[lang]}</Badge>
      ))}
    </span>
  ) : (
    ''
  );

ItemCategoryList.propTypes = {
  itemCategoryList: PropTypes.arrayOf(PropTypes.object),
  lang: PropTypes.string.isRequired,
};

ItemCategoryList.defaultProps = {
  itemCategoryList: [],
};

export default ItemCategoryList;
