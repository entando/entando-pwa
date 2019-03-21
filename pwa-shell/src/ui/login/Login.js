import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Col } from 'reactstrap';

class Login extends Component
{
  render() {
    const { username, children } = this.props;

    console.log(username);

    if (username !== null) {
      return (
        <Fragment>
        { children }
        </Fragment>
      );
    }

    return (
      <Container fluid className="login min-vh-100">
        <Col xs={12}>
          ciao
        </Col>
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
