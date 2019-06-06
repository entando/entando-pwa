import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { withKeycloak } from 'react-keycloak';
import { FormattedMessage } from 'react-intl.macro';

class KeycloakLoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { keycloak } = this.props;
    keycloak.login();
  }

  render() {
    return (
      <div className="KeycloakLoginForm">
        <Button
          className="KeycloakLoginForm__button w-100"
          onClick={this.handleSubmit}
        >
          <FormattedMessage id="login.performLogin" defaultMessage="Login" />
        </Button>
      </div>
    );
  }
}

KeycloakLoginForm.propTypes = {
  keycloak: PropTypes.object.isRequired,
};

export default withKeycloak(KeycloakLoginForm);
