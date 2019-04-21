import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import NavButton from 'ui/common/NavButton';

import logo from 'images/Logo_horizontal@2x.png';

class NotificationsTopBar extends PureComponent {
  render() {
    const { clearAllNotifications, selectedContentType } = this.props;
    return (
      <div className="topbar shadow-sm fixed-top">
        <Navbar light>
          <Nav>
            <NavItem>
              <NavLink tag={Link} to={`/`}>
                <NavButton icon="arrow-left" />
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarBrand
            tag={Link}
            to={`/content/${selectedContentType}`}
            className="mx-auto"
          >
            <img
              className="logo"
              src={logo}
              alt="logo"
            />
          </NavbarBrand>
          <Nav className="nav-right">
            <NavItem>
                <NavButton icon="check-double" onClick={clearAllNotifications} />
            </NavItem>
          </Nav>          
        </Navbar>
      </div>
    );
  }
}

NotificationsTopBar.propTypes = {
  clearAllNotifications: PropTypes.func.isRequired,
};

export default NotificationsTopBar;
