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
  getRequiresAuthMap,
} from 'state/content/selectors';
import { getSearchTerms } from 'state/search/selectors';

export const mapStateToProps = state => ({
  contentList: getContentList(state),
  requiresAuthMap: getRequiresAuthMap(state),
  contentListMeta: getContentListMeta(state),
  hasMoreItems: getListHasMorePages(state),
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
