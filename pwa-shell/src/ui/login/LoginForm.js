import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, FormGroup, Label, Button } from 'reactstrap';

import Input from 'ui/common/Input';

class LoginForm extends Component
{
  render() {
    const { handleSubmit } = this.props;

    return (
      <Form className="loginForm p-3 vh-100" onSubmit={handleSubmit}>
        <legend className="text-center mt-4">Accedi al tuo account</legend>
        <FormGroup>
          <Label for="username" className="ml-2">Username</Label>
          <Field component={Input} type="text" name="username" id="username" placeholder="inserisci la tua username" />
        </FormGroup>
        <FormGroup>
          <Label for="pin" className="ml-2">PIN</Label>
          <Field component={Input} type="password" name="pin" id="pin" placeholder="Inserisci il tuo pin di 4 cifre" />
        </FormGroup>
        <Button className="invisible">Submit</Button>
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
