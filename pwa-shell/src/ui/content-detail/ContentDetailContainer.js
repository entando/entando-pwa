import { connect } from 'react-redux';
import { getSelectedContent, isUserLogged } from 'state/content/selectors';
import { setRequiresAuth } from 'state/content/actions';
import { fetchContentDetail, fetchProtectedContentDetail } from 'state/thunks';
import ContentDetail from 'ui/content-detail/ContentDetail';

export const mapStateToProps = state => ({
  contentDetail: getSelectedContent(state),
  isUserLogged: isUserLogged(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentDetailAndMarkAsRead: () => {
    const requiresAuth = new URLSearchParams(ownProps.location.search).get('requiresAuth') === 'true';
    const { id } = ownProps.match.params;
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
