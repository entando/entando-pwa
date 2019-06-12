import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import LoginFormContainer from 'ui/login/LoginFormContainer';
import KeycloakRedirect from './KeycloakRedirect';

const Login = ({ hasAccess, children, useKeycloak }) =>
  hasAccess ? (
    <>{children}</>
  ) : useKeycloak ? (
    <KeycloakRedirect />
  ) : (
    <Container fluid className="login">
      <div className="login__bgtop" />
      <LoginFormContainer />
    </Container>
  );

Login.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  hasAccess: PropTypes.bool.isRequired,
};

export default Login;
