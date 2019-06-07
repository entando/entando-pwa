import { connect } from 'react-redux';
import { closeSearch } from 'state/search/actions';
import { getSelectedContentType } from 'state/contentType/selectors';
import { fetchContentListByContentType } from 'state/thunks';
import { getSearchTerms } from 'state/search/selectors';
import SearchBar from 'ui/menu/SearchBar';

const mapStateToProps = state => ({
  contentType: getSelectedContentType(state),
  searchTerm: getSearchTerms(state),
});

export const mapDispatchToProps = dispatch => ({
  closeSearch: contentType => {
    dispatch(closeSearch());
    dispatch(fetchContentListByContentType(contentType));
  },
  search: (contentType, value) => {
    dispatch(fetchContentListByContentType(contentType, null, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
