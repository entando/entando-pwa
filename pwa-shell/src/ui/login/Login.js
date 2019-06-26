import React from 'react';
import { Container } from 'reactstrap';
import LoginFormContainer from 'ui/login/LoginFormContainer';

const Login = props => (
  <Container fluid className="login">
    <LoginFormContainer {...props} />
  </Container>
);

export default Login;
