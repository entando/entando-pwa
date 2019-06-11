import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import LoginFormContainer from 'ui/login/LoginFormContainer';

class Login extends Component {
  render() {
    const { hasAccess, children } = this.props;
    return hasAccess ? (
      <>{children}</>
    ) : (
      <Container fluid className="login">
        <div className="login__bgtop" />
        <LoginFormContainer />
      </Container>
    );
  }
}

Login.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  hasAccess: PropTypes.bool.isRequired,
};

export default Login;
