import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Login from 'ui/login/LoginForm';
import { login as performLogin } from 'state/thunks';

export const mapDispatchToProps = (dispatch, { intl }) => ({
  onSubmit: data => dispatch(performLogin(data, intl)),
});

export default injectIntl(
  connect(
    null,
    mapDispatchToProps,
  )(Login),
);
