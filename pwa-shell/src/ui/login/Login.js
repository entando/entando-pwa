import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import LoginFormContainer from 'ui/login/LoginFormContainer';

class Login extends Component
{
  render() {
    const { username, children } = this.props;

    if (username !== null) {
      return (
        <Fragment>
        { children }
        </Fragment>
      );
    }

    return (
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
  username: PropTypes.string,
};

export default Login;
