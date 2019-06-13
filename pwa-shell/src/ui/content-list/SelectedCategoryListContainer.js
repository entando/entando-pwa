import { connect } from 'react-redux';
import { getCategoryList } from 'state/category/selectors';
import { getSelectedCategoryFilters } from 'state/content/selectors';
import { getLanguageCode } from 'state/language/selectors';
import SelectedCategoryList from 'ui/content-list/SelectedCategoryList';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
  lang: getLanguageCode(state),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
});

export const mapDispatchToProps = null;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectedCategoryList),
);
