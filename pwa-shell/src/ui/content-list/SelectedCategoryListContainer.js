import { get } from 'lodash';

import { connect } from 'react-redux';
import { getCategoryList } from 'state/category/selectors';
import { getSelectedCategoryFilters } from 'state/content/selectors';
import { getLanguageCode } from 'state/language/selectors';
import { fetchCategoryListAndFilters } from 'state/thunks';
import SelectedCategoryList from 'ui/content-list/SelectedCategoryList';
import { setSelectedContentType } from 'state/contentType/actions';
import { withRouter } from 'react-router-dom';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
  lang: getLanguageCode(state),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategoryListAndFilters: () => {
    const contentType = get(ownProps, 'match.params.contentType');
    dispatch(setSelectedContentType(contentType));
    dispatch(fetchCategoryListAndFilters());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectedCategoryList),
);
