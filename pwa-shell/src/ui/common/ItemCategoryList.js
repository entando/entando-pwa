import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Badge from 'ui/common/Badge';

class ItemCategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryList();
  }

  render() {
    const { itemCategoryList } = this.props;
    return itemCategoryList && itemCategoryList.length ? (
      <span className="ItemCategoryList">
        {
          itemCategoryList.map(category => (
            <Badge key={category.code}>{category.titles['it']}</Badge>
          ))
        }
      </span>
    ) : '';
  }
}

ItemCategoryList.propTypes = {
  itemCategoryList: PropTypes.arrayOf(PropTypes.object),
};

ItemCategoryList.defaultProps = {
  itemCategoryList: [],
};

export default ItemCategoryList;
