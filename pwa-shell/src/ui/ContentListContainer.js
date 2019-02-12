import { connect } from 'react-redux';
import { fetchContentList } from 'state/thunks';
import ContentList from 'ui/ContentList';

export const mapStateToProps = state => {
  const contentType = state.contentType.selected;
  return {    
    contentList: state.content.list[contentType],
    contentType,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onFetchContentList: () => {
    const { contentType } = ownProps.match.params;
    dispatch(fetchContentList(contentType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);
