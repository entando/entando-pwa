import { connect } from 'react-redux';
import ContentDetailTopBar from 'ui/ContentDetailTopBar';

export const mapStateToProps = (state, ownProps) => ({
  contentType: ownProps.match.params.contentType,
});

export const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetailTopBar);
