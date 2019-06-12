import { connect } from 'react-redux';
import { getCategoryList } from 'state/category/selectors';
import { getSelectedCategoryFilters } from 'state/content/selectors';
import { getLanguageCode } from 'state/language/selectors';
import { fetchCategoryListAndFilters } from 'state/thunks';
import SelectedCategoryList from 'ui/content-list/SelectedCategoryList';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
  lang: getLanguageCode(state),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchCategoryListAndFilters: () => dispatch(fetchCategoryListAndFilters()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedCategoryList);
