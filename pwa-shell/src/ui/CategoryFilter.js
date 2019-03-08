import React, { Component } from 'react';

class CategoryFilter extends Component {

  componentDidMount() {
    this.props.fetchCategoryList();
  }

  render() {
    const { categories, selectCategory } = this.props;

    return (
      categories.map(category => (
        <button
          key={category.code}
          onClick={() => selectCategory(category.code)}
        >
          { category.titles['it'] }
        </button>
      ))  
    );    
  }
}

export default CategoryFilter;
