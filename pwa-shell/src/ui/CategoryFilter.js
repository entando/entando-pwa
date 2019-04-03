import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as FilterIcon } from 'images/icons/ic_filter.svg';

class CategoryFilter extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryListAndFilters();
  }

  handleToggleCategory(categoryCode) {
    let codes = [...this.props.selectedCategoryCodes];
    if (codes.includes(categoryCode)) {
      codes.splice(codes.indexOf(categoryCode), 1);
    } else {
      codes.push(categoryCode);
    }
    this.props.onChange(codes);
  }

  render() {
    const { categories, selectedCategoryCodes } = this.props;

    return (
      <div className="CategoryFilter">
        <div className="CategoryFilter__header">
          <FilterIcon />
          <span className="CategoryFilter__title">Seleziona i tuoi argomenti di interesse</span>
        </div>        
        <ul className="CategoryFilter__group">
          {
            categories.map(category => (
              <li
                key={category.code}
                className="CategoryFilter__group-item"
              >
                <label>
                  { category.titles['it'] }
                </label>
                <input                  
                    type="checkbox"      
                    checked={selectedCategoryCodes.includes(category.code)}
                    onChange={() => this.handleToggleCategory(category.code)}
                  />
              </li>
            ))  
          }
        </ul>
      </div>
    );    
  }
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    titles: PropTypes.shape({}),
  })),
  selectedCategoryCodes: PropTypes.arrayOf(PropTypes.string),
  fetchCategoryListAndFilters: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

CategoryFilter.defaultProps = {
  categories: [],
  selectedCategoryCodes: [],
};

export default CategoryFilter;
