import { connect } from 'react-redux';
import { getCategoryList } from 'state/category/selectors';
import { getSelectedCategoryFilters } from 'state/content/selectors';
import { fetchCategoryListAndFilters } from 'state/thunks';
import CategoryList from 'ui/CategoryList';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchCategoryListAndFilters: () => dispatch(fetchCategoryListAndFilters()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
