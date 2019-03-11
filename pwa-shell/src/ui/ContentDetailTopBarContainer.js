import { connect } from 'react-redux';
import { getSelectedContentType } from 'state/contentType/selectors';
import ContentDetailTopBar from 'ui/ContentDetailTopBar';

export const mapStateToProps = state => ({
  selectedContentType: getSelectedContentType(state),
});

export const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetailTopBar);
