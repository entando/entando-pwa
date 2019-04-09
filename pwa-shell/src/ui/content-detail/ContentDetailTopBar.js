import React from 'react';
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

const ContentDetailTopBar = ({ contentType }) => (
  <div className="topbar shadow-sm fixed-top">
    <Navbar expand="lg" light>
      <Nav>
        <NavItem>
          <NavLink tag={Link} to={`/content/${contentType}`}>
            <NavButton icon="arrow-left" />
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

export default ContentDetailTopBar;
