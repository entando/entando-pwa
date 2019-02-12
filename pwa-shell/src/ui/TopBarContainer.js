import { connect } from 'react-redux';
import { fetchContentTypes } from 'state/thunks';
import { setSelectedContentType } from 'state/actions';
import TopBar from 'ui/TopBar';

export const mapStateToProps = state => ({
  contentTypeList: state.contentType.list,
  selectedContentType: state.contentType.selected,
});

export const mapDispatchToProps = dispatch => ({
  onFetchContentTypes: () => {
    dispatch(fetchContentTypes());
  },
  onSelectContentType: (contentType) => {
    dispatch(setSelectedContentType(contentType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
