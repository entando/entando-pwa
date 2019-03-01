import { connect } from 'react-redux';
import { navigateContentType } from 'state/thunks';
import ContentList from 'ui/ContentList';

export const mapStateToProps = state => {
  return {    
    contentList: state.content.list,
    contentType: state.contentType.selected,
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
