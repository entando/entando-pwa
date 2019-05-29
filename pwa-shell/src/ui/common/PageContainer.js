import { connect } from 'react-redux';
import { clearErrors } from '@entando/messages';
import { clearToasts } from 'state/thunks';
import Page from 'ui/common/Page';

export const mapDispatchToProps = dispatch => ({
  willUnmount: () => {
    dispatch(clearErrors());
    dispatch(clearToasts());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Page);
