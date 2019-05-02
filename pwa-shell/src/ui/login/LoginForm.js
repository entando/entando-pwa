import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Label, Button } from 'reactstrap';

import Input from 'ui/common/Input';
import ErrorsAlertContainer from 'ui/common/ErrorsAlertContainer';

class LoginForm extends Component
{
  render() {
    const { handleSubmit } = this.props;

    return (
      <Form className="LoginForm p-4" onSubmit={handleSubmit}>
        <legend className="text-center mt-4">Accedi al tuo account</legend>
        <ErrorsAlertContainer />
        <FormGroup>
          <Label for="username" className="ml-2">Username</Label>
          <Field component={Input} type="text" name="username" id="username" placeholder="inserisci la tua username" />
        </FormGroup>
        <FormGroup>
          <Label for="pin" className="ml-2">PIN</Label>
          <Field component={Input} type="password" name="pin" id="pin" placeholder="Inserisci il tuo pin di 4 cifre" />
        </FormGroup>
        <FormGroup>
          <Button className="LoginForm__button w-100">Accedi</Button>
        </FormGroup>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
})(LoginForm);
