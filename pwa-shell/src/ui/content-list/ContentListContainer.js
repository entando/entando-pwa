import { connect } from 'react-redux';
import { fetchContentListByContentType } from 'state/thunks';
import ContentList from 'ui/content-list/ContentList';
import {
  getContentList,
  getSelectedCategoryFilters,
  isSearchResult,
  isLoading,
} from 'state/content/selectors';
import {
  getSearchTerms,
} from 'state/search/selectors';
import { getSelectedContentType } from 'state/contentType/selectors';

export const mapStateToProps = state => {
  return {
    contentList: getContentList(state),
    contentType: getSelectedContentType(state),
    selectedCategoryCodes: getSelectedCategoryFilters(state),
    isSearchResult: isSearchResult(state),
    isLoading: isLoading(state),
    searchTerms: getSearchTerms(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentList: () => {
    const { contentType } = ownProps.match.params;
    dispatch(fetchContentListByContentType(contentType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);
