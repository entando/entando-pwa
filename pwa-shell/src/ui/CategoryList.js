import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FilterIcon } from 'images/icons/ic_filter.svg';
import Badge from 'ui/common/Badge';

class CategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryListAndFilters();
  }

  render() {
    const { categories, selectedCategoryCodes } = this.props;

    return (
      <div className="CategoryList">
      {
        selectedCategoryCodes.length
          ? (
            <div className="CategoryList__header">
              <FilterIcon />
              <span className="CategoryList__title">Argomenti che stai visualizzando</span>
            </div>
          )
          : ''
      }
      {
      categories.filter(category => selectedCategoryCodes.includes(category.code)).map(category => (
        <span className="CategoryList__item"
          key={category.code}
        >
          <Badge>{ category.titles['it'] }</Badge>
        </span>
      ))
    }
    </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    titles: PropTypes.shape({}),
  })),
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  fetchCategoryListAndFilters: PropTypes.func.isRequired,
};

CategoryList.defaultProps = {
  categories: [],
  selectedCategoryCodes: [],
};

export default CategoryList;
