import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DefaultAuthContext from './DefaultAuthContext';

class DefaultAuthProvider extends Component {
  render() {
    const authInitialized = true; //there is no external auth to load
    const { loadUserProfile, username } = this.props;
    const auth = {
      login: () =>
        this.props.history.replace(
          `/login?redirect_uri=${window.location.pathname}`,
        ),
      loadLoggedEntandoUser: () => {
        loadUserProfile(username);
      },
      logout: () => {},
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
  loadUserProfile: PropTypes.func.isRequired,
};

export default withRouter(DefaultAuthProvider);
