import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import LoginFormContainer from 'ui/login/LoginFormContainer';

class Login extends Component
{
  render() {
    const { hasAccess, children } = this.props;
    return hasAccess ? (
      <Fragment>
        { children }
      </Fragment>
    ) : (
      <Container fluid className="login min-vh-100">
        <LoginFormContainer />
      </Container>
    );
  }
}

Login.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element.isRequired
  ).isRequired,
  hasAccess: PropTypes.bool,
};

export default Login;
