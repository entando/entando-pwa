import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withKeycloak } from 'react-keycloak';

import { injectIntl, intlShape } from 'react-intl';
import { FormattedMessage, defineMessages } from 'react-intl.macro';

import Input from 'ui/common/Input';
import LoginErrorsAlertContainer from 'ui/login/LoginErrorsAlertContainer';

const messages = defineMessages({
  passwordPlaceholder: {
    id: 'login.passwordPlaceholder',
    defaultMessage: 'type your password',
  },
  usernamePlaceholder: {
    id: 'login.usernamePlaceholder',
    defaultMessage: 'type your username',
  },
});

class LoginForm extends Component {
  render() {
    const { keycloak, keycloakInitialized, handleSubmit, intl } = this.props;

    const passwordPlaceholder = intl.formatMessage(
      messages.passwordPlaceholder,
    );
    const usernamePlaceholder = intl.formatMessage(
      messages.usernamePlaceholder,
    );

    const kl = () => {
      keycloak.login();
    };

    return (
      <Form className="LoginForm p-4" onSubmit={kl}>
        <button type="button" onClick={kl}>
          Login
        </button>
        <legend className="text-center mt-4">
          <FormattedMessage
            id="login.title"
            defaultMessage="Login to your account"
          />
        </legend>
        <LoginErrorsAlertContainer />
        <FormGroup>
          <Label for="username" className="ml-2">
            Username
          </Label>
          <Field
            component={Input}
            type="text"
            name="username"
            id="username"
            placeholder={usernamePlaceholder}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pin" className="ml-2">
            PIN
          </Label>
          <Field
            component={Input}
            type="password"
            name="pin"
            id="pin"
            placeholder={passwordPlaceholder}
          />
        </FormGroup>
        <FormGroup>
          <Button className="LoginForm__button w-100">
            <FormattedMessage id="login.performLogin" defaultMessage="Login" />
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(injectIntl(withKeycloak(LoginForm)));
