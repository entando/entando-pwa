import React from 'react';
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
        tag={Link}
        to={`/content/${contentType}`}
        className="mx-auto"
      >
        <img
          className="logo"
          src={logo}
          alt="logo"
        />
      </NavbarBrand>
      <Nav />
    </Navbar>
  </div>  
);

ContentDetailTopBar.propTypes = {
  contentType: PropTypes.string,
};

ContentDetailTopBar.defaultProps = {  
  contentType: null,
};

export default ContentDetailTopBar;
