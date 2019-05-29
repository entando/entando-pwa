import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import LoginFormContainer from 'ui/login/LoginFormContainer';

class Login extends Component {
  render() {
    const { hasAccess, children } = this.props;
    return hasAccess ? (
      <Fragment>{children}</Fragment>
    ) : (
      <Container fluid className="login">
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
