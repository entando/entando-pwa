import { connect } from 'react-redux';
import { removeToast } from '@entando/messages';

import Toasts from 'ui/common/Toasts';
import { getUniqueToasts } from 'state/selectors';

export const mapStateToProps = state => ({
  toasts: getUniqueToasts(state),
});

export const mapDispatchToProps = dispatch => ({
  onDismiss: id => dispatch(removeToast(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toasts);
