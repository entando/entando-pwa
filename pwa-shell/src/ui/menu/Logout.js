import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as LogoutIcon } from 'images/icons/ic_exit.svg';

class Logout extends Component
{
  render() {
    const { isUserLogged, logoutUser } = this.props;

    return isUserLogged ? (
      <div className="logout-box">
        <div className="d-flex">
          <FontAwesomeIcon icon="user-circle" />
          <div className="ml-2">
            <p className="mb-0 text-muted">TEN. COL.</p>
            <p><strong>Francesco Carracciolo</strong></p>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => logoutUser()}>
          <LogoutIcon /><span className="ml-2 align-bottom">Logout</span>
        </div>
      </div>
    ) : '';
  }
}

Logout.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,  
};

export default Logout;