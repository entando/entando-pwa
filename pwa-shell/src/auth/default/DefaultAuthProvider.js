import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DefaultAuthContext from './DefaultAuthContext';

class DefaultAuthProvider extends Component {
  render() {
    const authInitialized = true; //there is no external auth to load
    const auth = {
      login: () =>
        this.props.history.replace(
          `/login?redirect_uri=${window.location.pathname}`,
        ),
    };
    return (
      <DefaultAuthContext.Provider value={{ auth, authInitialized }}>
        {this.props.children}
      </DefaultAuthContext.Provider>
    );
  }
}

DefaultAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withRouter(DefaultAuthProvider);
