import { connect } from 'react-redux';
import { fetchContentTypeCodes } from 'state/thunks';
import DefaultRedirect from 'ui/DefaultRedirect';

export const mapStateToProps = state => ({    
  defaultContentType: state.contentType.list[0],
});

export const mapDispatchToProps = dispatch => ({
  onFetchContentTypeList: () => {
    dispatch(fetchContentTypeCodes());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultRedirect);
