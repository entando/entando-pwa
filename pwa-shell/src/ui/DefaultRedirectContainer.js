import { connect } from 'react-redux';
import { fetchContentTypes } from 'state/thunks';
import DefaultRedirect from 'ui/DefaultRedirect';

export const mapStateToProps = state => {
  return {    
    defaultContentType: state.types.list[0],
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onFetchContentTypeList: () => {
      dispatch(fetchContentTypes());
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultRedirect);
