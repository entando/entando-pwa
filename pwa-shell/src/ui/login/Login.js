import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import LoginFormContainer from 'ui/login/LoginFormContainer';

const Login = ({ hasAccess, children }) =>
  hasAccess ? (
    <>{children}</>
  ) : (
    <Container fluid className="login">
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
