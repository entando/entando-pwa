import { connect } from 'react-redux';
import { fetchContentTypeCodes, fetchContentTypeMap } from 'state/thunks';
import { setSelectedContentType } from 'state/actions';
import TopBar from 'ui/TopBar';

export const mapStateToProps = state => ({
  contentTypeList: state.contentType.list,
  contentTypeMap: state.contentType.map,
  selectedContentType: state.contentType.selected,
});

export const mapDispatchToProps = dispatch => ({
  onFetchContentTypes: () => {
    dispatch(fetchContentTypeCodes());
    dispatch(fetchContentTypeMap());
  },
  onSelectContentType: (contentType) => {
    dispatch(setSelectedContentType(contentType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
