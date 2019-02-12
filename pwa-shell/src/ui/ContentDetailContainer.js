import { connect } from 'react-redux';
import { fetchContentDetail } from 'state/thunks';
import ContentDetail from 'ui/ContentDetail';

export const mapStateToProps = state => ({
  contentDetail: state.content.selected,
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onFetchContentDetail: () => {
    const { contentType, id } = ownProps.match.params;
    dispatch(fetchContentDetail(contentType, id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetail);
