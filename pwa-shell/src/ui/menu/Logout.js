import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { defineMessages } from 'react-intl.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl.macro';

import { ReactComponent as LogoutIcon } from 'images/icons/ic_exit.svg';

const messages = defineMessages({
  noname: {
    id: 'profile.noname',
    defaultMessage: 'Registered User',
  },
});

class Logout extends Component {
  render() {
    const { intl, isUserLogged, userFullname, logoutUser } = this.props;
    const fullNameDisplay = userFullname
      ? userFullname
      : intl.formatMessage(messages.noname);
    return isUserLogged ? (
      <div className="logout-box">
        <div className="d-flex">
          <FontAwesomeIcon icon="user-circle" />
          <div className="ml-2">
            <p>
              <strong>{fullNameDisplay}</strong>
            </p>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => logoutUser()}>
          <LogoutIcon />
          <span className="ml-2 align-bottom">
            <FormattedMessage id="drawer.labelLogout" defaultMessage="Logout" />
          </span>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

Logout.propTypes = {
  intl: intlShape.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  userFullname: PropTypes.string,
};

export default injectIntl(Logout);
