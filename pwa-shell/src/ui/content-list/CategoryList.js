import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl.macro';
import { ReactComponent as FilterIcon } from 'images/icons/ic_filter.svg';
import Badge from 'ui/common/Badge';

class CategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryListAndFilters();
  }

  render() {
    const { categories, lang, selectedCategoryCodes } = this.props;

    return categories.length ? (
      <div className="CategoryList">
        {selectedCategoryCodes.length ? (
          <div className="CategoryList__header">
            <FilterIcon />
            <span className="CategoryList__title">
              <FormattedMessage
                id="categorylist.topicsViewing"
                defaultMessage="Topics you are viewing"
              />
            </span>
          </div>
        ) : null}
        {categories
          .filter(category => selectedCategoryCodes.includes(category.code))
          .map(category => (
            <span className="CategoryList__item" key={category.code}>
              <Badge>{category.titles[lang]}</Badge>
            </span>
          ))}
      </div>
    ) : (
      ''
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      titles: PropTypes.shape({}),
    }),
  ),
  lang: PropTypes.string,
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  fetchCategoryListAndFilters: PropTypes.func.isRequired,
};

CategoryList.defaultProps = {
  categories: [],
  lang: 'en',
  selectedCategoryCodes: [],
};

export default CategoryList;
