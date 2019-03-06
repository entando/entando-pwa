import { connect } from 'react-redux';
import DefaultRedirect from 'ui/DefaultRedirect';
import { getDefaultContentTypeCode } from 'state/selectors';

export const mapStateToProps = state => ({    
  defaultContentTypeCode: getDefaultContentTypeCode(state),
});

export const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultRedirect);
