import { get } from 'lodash';
import { connect } from 'react-redux';
import { fetchContentListByContentType } from 'state/thunks';
import ContentList from 'ui/content-list/ContentList';
import {
  getContentList,
  getContentListMeta,
  getListHasMorePages,
  getSelectedCategoryFilters,
  isSearchResult,
  isLoading,
} from 'state/content/selectors';
import { getSearchTerms } from 'state/search/selectors';
import { getSelectedContentType } from 'state/contentType/selectors';

export const mapStateToProps = (state, ownProps) => ({
  contentList: getContentList(state),
  contentListMeta: getContentListMeta(state),
  hasMoreItems: getListHasMorePages(state),
  contentType: get(
    ownProps,
    'match.params.contentType',
    getSelectedContentType(state),
  ),
  selectedCategoryCodes: getSelectedCategoryFilters(state),
  isSearchResult: isSearchResult(state),
  isLoading: isLoading(state),
  searchTerms: getSearchTerms(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentList: ({ pageObj, search }) => {
    const contentType = get(ownProps, 'match.params.contentType');
    dispatch(fetchContentListByContentType(contentType, pageObj, search));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentList);
