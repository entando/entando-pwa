import React, { PureComponent } from 'react';

import { ReactComponent as FilterIcon } from 'images/icons/ic_filter.svg';
import Badge from 'ui/Badge';

class CategoryList extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryList();
  }

  render() {
    const { categories, selectedCategoryCodes } = this.props;

    return (
      <div className="CategoryList">
      {
        selectedCategoryCodes && selectedCategoryCodes.length 
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
          <Badge color="secondary">{ category.titles['it'] }</Badge>          
        </span>
      ))  
    }
    </div>
    );    
  }
}

export default CategoryList;
