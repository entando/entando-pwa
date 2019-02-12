import { connect } from 'react-redux';
import { fetchContentList } from 'state/thunks';
import ContentList from 'ui/ContentList';

export const mapStateToProps = state => {
  const contentType = state.types.selected;
  return {    
    contentList: state.list[contentType],
    contentType,
  };
};

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFetchContentList: () => {
      const { contentType } = ownProps.match.params;
      dispatch(fetchContentList(contentType));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentList);
