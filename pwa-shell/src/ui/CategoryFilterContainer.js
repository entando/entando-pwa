import { connect } from 'react-redux';
import { fetchCategoryList, navigateContentType } from 'state/thunks';
import CategoryFilter from 'ui/CategoryFilter';
import { getCategoryList } from 'state/category/selectors';
import { setCategoryFilter } from 'state/content/actions';

export const mapStateToProps = state => ({
  categories: getCategoryList(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategoryList: () => dispatch(fetchCategoryList()),
  selectCategory: category => {
    dispatch(setCategoryFilter(category, ownProps.contentType));
    dispatch(navigateContentType(ownProps.contentType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilter);
