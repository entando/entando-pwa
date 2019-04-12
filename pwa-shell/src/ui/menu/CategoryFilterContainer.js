import { connect } from 'react-redux';
import { fetchContentListByContentType, fetchCategoryListAndFilters } from 'state/thunks';
import CategoryFilter from 'ui/menu/CategoryFilter';
import { getCategoryList } from 'state/category/selectors';
import { getSelectedCategoryFilters } from 'state/content/selectors';
import { setCategoryFilter } from 'state/content/actions';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategoryListAndFilters: () => dispatch(fetchCategoryListAndFilters()),
  onChange: selectedCategoryCodes => {
    dispatch(setCategoryFilter(selectedCategoryCodes, ownProps.contentType));
    dispatch(fetchContentListByContentType(ownProps.contentType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilter);
