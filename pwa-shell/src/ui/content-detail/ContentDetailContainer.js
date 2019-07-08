import { get } from 'lodash';
import { connect } from 'react-redux';
import {
  getSelectedContent,
  isUserLogged,
  isLoading,
  getNextToSelectedContent,
  getPreviousFromSelectedContent,
} from 'state/content/selectors';
import { setRequiresAuth } from 'state/content/actions';
import {
  fetchContentDetail,
  fetchProtectedContentDetail,
  fetchCategoryListAndFilters,
} from 'state/thunks';
import ContentDetail from 'ui/content-detail/ContentDetail';
import { getSelectedContentType } from 'state/contentType/selectors';
import { setSelectedContentType } from 'state/contentType/actions';

export const mapStateToProps = state => ({
  contentDetail: getSelectedContent(state),
  contentType: getSelectedContentType(state),
  isUserLogged: isUserLogged(state),
  isLoading: isLoading(state),
  nextContent: getNextToSelectedContent(state),
  prevContent: getPreviousFromSelectedContent(state),
});

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchContentDetail: (location, params) => {
    const requiresAuth =
      new URLSearchParams(location.search).get('requiresAuth') === 'true';
    if (params) {
      const { id, contentType } = params;
      dispatch(setSelectedContentType(contentType));
      dispatch(setRequiresAuth(id, requiresAuth));
      if (requiresAuth) {
        dispatch(fetchProtectedContentDetail(id));
      } else {
        dispatch(fetchContentDetail(id));
      }
    }
  },
  fetchCategoryListAndFilters: () => {
    const contentType = get(ownProps, 'match.params.contentType');
    dispatch(setSelectedContentType(contentType));
    dispatch(fetchCategoryListAndFilters());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentDetail);
