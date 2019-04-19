import { connect } from 'react-redux';

import ContentCategoryList from 'ui/common/ContentCategoryList';
import { getCategoryMap } from 'state/category/selectors';

export const mapStateToProps = (state, ownProps) => {
  const categoryMap = getCategoryMap(state);  
  return {
    categoryList: ownProps.contentCategoryIdList.map(categoryId => categoryMap[categoryId])
  };
};

const ContentCategoryListContainer = connect(mapStateToProps, null)(ContentCategoryList);

export default ContentCategoryListContainer;
