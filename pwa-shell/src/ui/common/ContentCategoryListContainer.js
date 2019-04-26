import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getCategoryMap } from 'state/category/selectors';
import { fetchCategoryListAndFilters } from 'state/thunks';
import ContentCategoryList from 'ui/common/ContentCategoryList';

export const mapStateToProps = (state, ownProps) => {
  const categoryMap = getCategoryMap(state);
  const contentCategoryList = isEmpty(ownProps.contentCategoryIdList) || isEmpty(categoryMap) ?
    [] :
    ownProps.contentCategoryIdList.map(categoryId => categoryMap[categoryId]);
  return { contentCategoryList };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryList: () => dispatch(fetchCategoryListAndFilters()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentCategoryList);
