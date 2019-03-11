import { connect } from 'react-redux';
import { fetchContentTypeMap } from 'state/thunks';
import { setSelectedContentType } from 'state/contentType/actions';
import { getContentTypeCodeList, getSelectedContentType, getContentTypeMap } from 'state/contentType/selectors';
import TopBar from 'ui/TopBar';

export const mapStateToProps = state => ({
  contentTypeList: getContentTypeCodeList(state),
  contentTypeMap: getContentTypeMap(state),
  selectedContentType: getSelectedContentType(state),
});

export const mapDispatchToProps = dispatch => ({
  onFetchContentTypes: () => {
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
