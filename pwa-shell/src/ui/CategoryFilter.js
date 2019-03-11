import React, { PureComponent } from 'react';

class CategoryFilter extends PureComponent {
  componentDidMount() {
    this.props.fetchCategoryList();
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
      {
      categories.map(category => (
        <button
          key={category.code}
          onClick={() => this.handleToggleCategory(category.code)}
        >
          { category.titles['it'] }
          &nbsp;
          { selectedCategoryCodes.includes(category.code) ? 'x' : '' }
        </button>        
      ))  
    }
    </div>
    );    
  }
}

export default CategoryFilter;
