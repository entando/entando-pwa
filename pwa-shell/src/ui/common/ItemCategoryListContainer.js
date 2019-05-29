import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { getCategoryMap } from 'state/category/selectors';
import { getLanguageCode } from 'state/language/selectors';
import { fetchCategoryListAndFilters } from 'state/thunks';
import ItemCategoryList from 'ui/common/ItemCategoryList';

export const mapStateToProps = (state, ownProps) => {
  const lang = getLanguageCode(state);
  const categoryMap = getCategoryMap(state);
  const itemCategoryList =
    isEmpty(ownProps.categoryIdList) || isEmpty(categoryMap)
      ? []
      : ownProps.categoryIdList.map(categoryId => categoryMap[categoryId]);
  return { itemCategoryList, lang };
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryList: () => dispatch(fetchCategoryListAndFilters()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemCategoryList);
