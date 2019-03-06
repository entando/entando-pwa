import { connect } from 'react-redux';
import { navigateContentType } from 'state/thunks';
import ContentList from 'ui/ContentList';
import { getContentList, getSelectedContentType } from 'state/selectors';

export const mapStateToProps = state => {
  return {    
    contentList: getContentList(state),
    contentType: getSelectedContentType(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onFetchContentList: () => {
    const { contentType } = ownProps.match.params;
    dispatch(navigateContentType(contentType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);
