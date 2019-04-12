import { connect } from 'react-redux';
import { getSelectedContent, isUserLogged, isLoading } from 'state/content/selectors';
import { setRequiresAuth } from 'state/content/actions';
import { fetchContentDetail, fetchProtectedContentDetail } from 'state/thunks';
import ContentDetail from 'ui/content-detail/ContentDetail';
import { getSelectedContentType } from 'state/contentType/selectors';
import { setSelectedContentType } from 'state/contentType/actions';

export const mapStateToProps = state => ({
  contentDetail: getSelectedContent(state),
  contentType: getSelectedContentType(state),
  isUserLogged: isUserLogged(state),
  isLoading: isLoading(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentDetailAndMarkAsRead: () => {
    const requiresAuth = new URLSearchParams(ownProps.location.search).get('requiresAuth') === 'true';
    const { id, contentType } = ownProps.match.params;
    dispatch(setSelectedContentType(contentType));
    dispatch(setRequiresAuth(id, requiresAuth));
    if (requiresAuth) {
      dispatch(fetchProtectedContentDetail(id));
    }
    else {
      dispatch(fetchContentDetail(id));
    };
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetail);
