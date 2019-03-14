import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import logo from 'images/Logo_horizontal@2x.png';

class ContentDetailTopBar extends PureComponent {
  render() {
    const { selectedContentType } = this.props;
    return (
      <div className="topbar shadow-sm fixed-top">
        <Navbar expand="lg" light>
          <Nav>
            <NavItem>
              <NavLink tag={Link} to={`/${selectedContentType}`}>
                Back
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarBrand
            className="mx-auto"
          >
            <img
              className="logo"
              src={logo}
              alt="logo"
            />
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(props => <ContentDetailTopBar {...props} />);
