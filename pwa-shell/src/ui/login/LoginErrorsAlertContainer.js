import { connect } from 'react-redux';
import { defineMessages } from 'react-intl.macro';
import { getErrors, clearErrors } from '@entando/messages';

import ErrorsAlert from 'ui/common/ErrorsAlert';

const loginErrorMessages = defineMessages({
  errorInvalidCredentials: {
    id: 'login.errorInvalidCredentials',
    defaultMessage: 'Invalid username and password.',
  },
  errorLoginRequest: {
    id: 'login.errorLoginRequest',
    defaultMessage: 'Error during login.',
  },
});

const transformLoginErrorMessage = error =>
  error === 'permissionDenied'
    ? loginErrorMessages.errorInvalidCredentials
    : loginErrorMessages.errorLoginRequest;

export const mapStateToProps = state => ({
  messages: getErrors(state).map(transformLoginErrorMessage),
});

export const mapDispatchToProps = dispatch => ({
  onDismiss: () => dispatch(clearErrors()),
});

const LoginErrorsAlertContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorsAlert);

export default LoginErrorsAlertContainer;
