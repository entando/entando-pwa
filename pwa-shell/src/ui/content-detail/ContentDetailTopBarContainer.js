import { connect } from 'react-redux';
import { getSelectedContentType } from 'state/contentType/selectors';
import ContentDetailTopBar from 'ui/content-detail/ContentDetailTopBar';

export const mapStateToProps = state => ({
  contentType: getSelectedContentType(state),
});

export default connect(
  mapStateToProps,
  null,
)(ContentDetailTopBar);
