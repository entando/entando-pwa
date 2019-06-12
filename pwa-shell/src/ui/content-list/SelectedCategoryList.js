import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl.macro';
import { ReactComponent as FilterIcon } from 'images/icons/ic_filter.svg';
import Badge from 'ui/common/Badge';

class SelectedCategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryListAndFilters();
  }

  render() {
    const { categories, lang, selectedCategoryCodes } = this.props;

    return categories.length ? (
      <div className="SelectedCategoryList">
        {selectedCategoryCodes.length ? (
          <div className="SelectedCategoryList__header">
            <FilterIcon />
            <span className="SelectedCategoryList__title">
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
            <span className="SelectedCategoryList__item" key={category.code}>
              <Badge>{category.titles[lang]}</Badge>
            </span>
          ))}
      </div>
    ) : (
      ''
    );
  }
}

SelectedCategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      titles: PropTypes.shape({}),
    }),
  ),
  lang: PropTypes.string.isRequired,
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  fetchCategoryListAndFilters: PropTypes.func.isRequired,
};

SelectedCategoryList.defaultProps = {
  categories: [],
  selectedCategoryCodes: [],
};

export default SelectedCategoryList;
