import { connect } from 'react-redux';
import { getSelectedContent } from 'state/content/selectors';
import { fetchContentDetail, clearNotification } from 'state/thunks';
import ContentDetail from 'ui/ContentDetail';

export const mapStateToProps = state => ({
  contentDetail: getSelectedContent(state)
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentDetailAndMarkAsRead: () => {
    const { id } = ownProps.match.params;
    dispatch(fetchContentDetail(id));
    dispatch(clearNotification(id));    
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetail);
