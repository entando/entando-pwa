import { connect } from 'react-redux';
import { fetchContentTypeMap, fetchNotifications } from 'state/thunks';
import { setSelectedContentType } from 'state/contentType/actions';
import { openDrawer } from 'state/drawer/actions';
import { openSearch } from 'state/search/actions';
import { getContentTypeCodeList, getSelectedContentType, getContentTypeMap } from 'state/contentType/selectors';
import { getNotificationAmount } from 'state/notification/selectors';
import { isUserLogged } from 'state/content/selectors';
import { isOpen } from 'state/search/selectors';
import ContentListTopBar from 'ui/content-list/ContentListTopBar';

export const mapStateToProps = state => ({
  notificationAmount: getNotificationAmount(state),
  contentTypeList: getContentTypeCodeList(state),
  contentTypeMap: getContentTypeMap(state),
  selectedContentType: getSelectedContentType(state),
  isSearchOpen: isOpen(state),
  isUserLogged: isUserLogged(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchContentTypes: () => {
    dispatch(fetchContentTypeMap());
  },
  fetchNotifications: () => {
    dispatch(fetchNotifications());
  },
  onSelectContentType: (contentType) => {
    dispatch(setSelectedContentType(contentType));
  },
  openDrawer: () => dispatch(openDrawer()),
  openSearch: () => dispatch(openSearch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentListTopBar);
