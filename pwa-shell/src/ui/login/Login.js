import React from 'react';
import { Container } from 'reactstrap';
import LoginFormContainer from 'ui/login/LoginFormContainer';

const Login = () => (
  <Container fluid className="login">
    <LoginFormContainer />
  </Container>
);

export default Login;
