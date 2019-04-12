import { connect } from 'react-redux';
import DefaultRedirect from 'DefaultRedirect';
import { getDefaultContentTypeCode } from 'state/contentType/selectors';

export const mapStateToProps = state => ({
  defaultContentTypeCode: getDefaultContentTypeCode(state),
});

export const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultRedirect);
