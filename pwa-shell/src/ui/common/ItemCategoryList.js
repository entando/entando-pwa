import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Badge from 'ui/common/Badge';

class ItemCategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryList();
  }

  render() {
    const { itemCategoryList, lang } = this.props;
    return itemCategoryList && itemCategoryList.length ? (
      <span className="ItemCategoryList">
        {itemCategoryList.map(category => (
          <Badge key={category.code}>{category.titles[lang]}</Badge>
        ))}
      </span>
    ) : (
      ''
    );
  }
}

ItemCategoryList.propTypes = {
  itemCategoryList: PropTypes.arrayOf(PropTypes.object),
  lang: PropTypes.string.isRequired,
};

ItemCategoryList.defaultProps = {
  itemCategoryList: [],
};

export default ItemCategoryList;
