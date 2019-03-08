import { connect } from 'react-redux';
import { navigateContentType } from 'state/thunks';
import ContentList from 'ui/ContentList';
import { getContentList } from 'state/content/selectors';
import { getSelectedContentType } from 'state/contentType/selectors';

export const mapStateToProps = state => {
  return {    
    contentList: getContentList(state),
    contentType: getSelectedContentType(state),
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onFetchContentList: () => {
    const { contentType } = ownProps.match.params; //TODO si può mettere parametro alla fetchContentList di ContentList
    dispatch(navigateContentType(contentType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);
